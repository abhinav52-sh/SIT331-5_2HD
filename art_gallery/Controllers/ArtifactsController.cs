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
    [Route("api/artifacts")]
    public class ArtifactsController : ControllerBase
    {
        private readonly IMongoCollection<Artifact> _artifacts;
        private readonly IGridFSBucket _gridFS;

        public ArtifactsController(MongoDbService mdbService, IGridFSBucket gridFS)
        {
            _artifacts = mdbService.Database?.GetCollection<Artifact>("artifacts");
            _gridFS = gridFS;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artifact>>> GetAllArtifacts()
        {
            try
            {
                var artifacts = await _artifacts.Find(FilterDefinition<Artifact>.Empty).ToListAsync();
                return Ok(artifacts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching all the artifacts: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artifact>> GetArtifactById(string id)
        {
            try
            {
                var filter = Builders<Artifact>.Filter.Eq(a => a.Id, id);
                var artifact = _artifacts.Find(filter).FirstOrDefault();
                if (artifact is null) return NotFound();
                return Ok(artifact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the artifact with id {id}: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Artifact>> AddArtifact([FromForm] Artifact artifact)
        {
            try
            {
                // Upload image to GridFS
                using (var stream = artifact.Image.OpenReadStream())
                {
                    var imageId = await _gridFS.UploadFromStreamAsync(artifact.Image.FileName, stream);
                    artifact.ImageId = imageId.ToString();
                }
    
                await _artifacts.InsertOneAsync(artifact);
                return CreatedAtAction(nameof(GetArtifactById), new { id = artifact.Id }, artifact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding the artifact: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<ActionResult<Artifact>> UpdateArtifact(Artifact artifact)
        {
            try
            {
                var filter = Builders<Artifact>.Filter.Eq(a => a.Id, artifact.Id);
                await _artifacts.ReplaceOneAsync(filter, artifact);
                return Ok($"Details of artifact with id {artifact.Id} updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the artifact with id {artifact.Id}: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Artifact>> DeleteArtifact(string id)
        {
            try
            {
                var filter = Builders<Artifact>.Filter.Eq(x => x.Id, id);
                await _artifacts.DeleteOneAsync(filter);
                return Ok($"Details of artifact with id {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the artifact's details with id {id}: {ex.Message}");
            }
        }
    }
}
