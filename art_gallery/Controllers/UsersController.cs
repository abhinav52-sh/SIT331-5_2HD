using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using art_gallery.Models;
using MongoDB.Driver;
using art_gallery.Persistence;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;


namespace art_gallery.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;

        public UsersController(MongoDbService mdbService)
        {
            _users = mdbService.Database?.GetCollection<User>("users");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            try
            {
                var users = await _users.Find(FilterDefinition<User>.Empty).ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching all the users: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(string id)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(a => a.Id, id);
                var user = _users.Find(filter).FirstOrDefault();
                if (user is null) return NotFound();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching the user with id {id}: {ex.Message}");
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User user)
        {
            try
            {
                var getUser = _users.Find(u => u.Email == user.Email).FirstOrDefault();

                if(getUser != null) return Conflict("User already exists.");

                user.CreatedDate = DateTime.Now;
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
                await _users.InsertOneAsync(user);
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding the user: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(a => a.Id, user.Id);
                await _users.ReplaceOneAsync(filter, user);
                return Ok($"Details of user with id {user.Id} updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the user with id {user.Id}: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(string id)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq(x => x.Id, id);
                await _users.DeleteOneAsync(filter);
                return Ok($"Details of user with id {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the user's details with id {id}: {ex.Message}");
            }
        }
    }
}
