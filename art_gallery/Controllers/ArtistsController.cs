using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using art_gallery.Models;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using art_gallery.Persistence;
using System.Security.AccessControl;
using Microsoft.AspNetCore.Authorization;

namespace art_gallery.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/artists")]
    public class ArtistsController : ControllerBase
    {
        private readonly IMongoCollection<Artist> _artists;
        private readonly IGridFSBucket _gridFS;

        public ArtistsController(MongoDbService mdbService, IGridFSBucket gridFS)
        {
            _artists = mdbService.Database?.GetCollection<Artist>("artists");
            _gridFS = gridFS;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artist>>> GetAllArtists()
        {
            try
            {
                var artists = await _artists.Find(FilterDefinition<Artist>.Empty).ToListAsync();
                return Ok(artists);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching all the artists: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artist>> GetArtistById(string id)
        {
            try
            {
                var filter = Builders<Artist>.Filter.Eq(a => a.Id, id);
                var artist = _artists.Find(filter).FirstOrDefault();
                if (artist is null) return NotFound();
                return Ok(artist);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the artist with id {id}: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Artist>> AddArtist([FromForm] Artist artist)
        {
            try
            {
                // Upload image to GridFS
                using (var stream = artist.Image.OpenReadStream())
                {
                    var imageId = await _gridFS.UploadFromStreamAsync(artist.Image.FileName, stream);
                    artist.ImageId = imageId.ToString();
                }

                await _artists.InsertOneAsync(artist);
                return CreatedAtAction(nameof(GetArtistById), new { id = artist.Id }, artist);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding the artist: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<ActionResult<Artist>> UpdateArtist(Artist artist)
        {
            try
            {
                var filter = Builders<Artist>.Filter.Eq(a => a.Id, artist.Id);
                await _artists.ReplaceOneAsync(filter, artist);
                return Ok($"Details of artist with id {artist.Id} updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the artist with id {artist.Id}: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Artist>> DeleteArtist(string id)
        {
            try
            {
                var filter = Builders<Artist>.Filter.Eq(x => x.Id, id);
                await _artists.DeleteOneAsync(filter);
                return Ok($"Details of artist with id {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the artist's details with id {id}: {ex.Message}");
            }
        }
    }
}
