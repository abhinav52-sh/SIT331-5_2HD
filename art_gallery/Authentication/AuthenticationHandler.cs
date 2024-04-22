using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using art_gallery.Models;
using art_gallery.Persistence;
using Microsoft.AspNetCore.Authorization;

namespace robot_controller_api.Authentication
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly IMongoCollection<User> _users;

        public BasicAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            MongoDbService mdbService) : base(options, logger, encoder, clock)
        {
            _users = mdbService.Database?.GetCollection<User>("users");
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var endpoint = Context.GetEndpoint();
            if (endpoint?.Metadata?.GetMetadata<IAllowAnonymous>() != null)
            {
                return AuthenticateResult.NoResult();
            }
            base.Response.Headers.Add("WWW-Authenticate", @"Basic realm=""Access to the robot controller.""");

            var authHeader = Request.Headers["Authorization"].ToString();

            if (!Request.Headers.ContainsKey("Authorization"))
            {
                Response.StatusCode = 401;
                return AuthenticateResult.Fail("Authorization header is missing.");
            }

            if (!authHeader.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
            {
                Response.StatusCode = 401;
                return AuthenticateResult.Fail("Authorization scheme is not supported.");
            }

            var encodedCredentials = authHeader.Substring(6);
            var credentialBytes = Convert.FromBase64String(encodedCredentials);
            var decodedCredentials = Encoding.UTF8.GetString(credentialBytes);
            var credentials = decodedCredentials.Split(':', 2);
            var email = credentials[0];
            var password = credentials[1];

            var user = _users.Find(u => u.Email == email).FirstOrDefault();
            if (user == null)
            {
                Response.StatusCode = 401;
                return AuthenticateResult.Fail("User not found.");
            }

            // Implementing hashing from Bcrypt
            var result = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!result)
            {
                Response.StatusCode = 401;
                return AuthenticateResult.Fail("Invalid password.");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var claimsPrincipal = new ClaimsPrincipal(identity);
            var authTicket = new AuthenticationTicket(claimsPrincipal, Scheme.Name);

            Response.StatusCode = 200;
            return AuthenticateResult.Success(authTicket);
        }
    }
}
