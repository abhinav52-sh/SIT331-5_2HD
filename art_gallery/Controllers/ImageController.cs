using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using art_gallery.Models;
using MongoDB.Bson;
using MongoDB.Driver.GridFS;

namespace art_gallery.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImagesController : ControllerBase
    {
        private readonly IGridFSBucket _gridFS;

        public ImagesController(IGridFSBucket gridFS)
        {
            _gridFS = gridFS;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetImage(string id)
        {
            try
            {
                ObjectId objectId;
                if (!ObjectId.TryParse(id, out objectId))
                {
                    return BadRequest("Invalid image id.");
                }

                var imageStream = await _gridFS.OpenDownloadStreamAsync(objectId);

                // Determine the content type based on the file extension
                string contentType;
                switch (Path.GetExtension(imageStream.FileInfo.Filename).ToLower())
                {
                    case ".jpg":
                    case ".jpeg":
                        contentType = "image/jpeg";
                        break;
                    case ".png":
                        contentType = "image/png";
                        break;
                    case ".gif":
                        contentType = "image/gif";
                        break;
                    // Add more cases for other image formats if needed
                    default:
                        contentType = "application/octet-stream"; // Default to binary data
                        break;
                }

                return File(imageStream, contentType);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the image: {ex.Message}");
            }
        }
    }
}
