using Microsoft.AspNetCore.Mvc;
using PisArch.Domain.Constants;
using PisArch.Domain.Models;
using PisArch.Infrastructure.Repositories;
using PisArch.Web.Helpers;

namespace PisArch.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly JwtHelper _jwtHelper;

        private const string key = "YourSecretKeyHere";
        private const string issuer = "YourIssuer";
        private const string audience = "YourAudience";
        private const int expireDays = 30;

        public UserController(UserRepository userRepository)
        {
            _userRepository = userRepository;
            _jwtHelper = new JwtHelper(key, issuer, audience, expireDays);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(string username, string password)
        {
            //TODO: Validation

            var cryptedPassword = BCrypt.Net.BCrypt.HashPassword(password);

            var newUser = new User()
            {
                Username = username,
                PasswordHash = cryptedPassword,
                Role = UserRoles.User
            };

            await _userRepository.CreateNewUserAsync(newUser);

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(string username, string password)
        {
            //TODO: Validation

            var user = await _userRepository.GetByUsername(username);
            if (user == null)
            {
                return NotFound();
            }

            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return Unauthorized();
            }

            var newAccessToken = _jwtHelper.GenerateJwtToken(user.Id);
            var newToken = new UserToken()
            {
                RefreshToken = _jwtHelper.GenerateRefreshToken(),
                RefreshTokenExpTime = DateTime.UtcNow.AddDays(7),
                UserId = user.Id
            };

            await _userRepository.AddNewToken(newToken);

            return Ok(new
            {
                accessToke = newAccessToken,
                userId = user.Id
            });
        }

        [HttpGet("getUserInfo")]
        public async Task<IActionResult> GetUserInfo(string accessToken)
        {
            var userId = _jwtHelper.GetUserIdFromJwtToken(accessToken);
            if (userId == null)
            {
                return Unauthorized();
            }

            var user = _userRepository.GetById(Int64.Parse(userId));
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("getUserInfoById")]
        public async Task<IActionResult> GetUserInfoId(long userId)
        {
            var user = await _userRepository.GetById(userId);
            return Ok(user);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout(long userId)
        {
            await _userRepository.LogoutAsync(userId);

            return Ok();
        }

        [HttpPost("usePromocode")]
        public async Task<IActionResult> UsePromocode(long userId, string promo)
        {
            _userRepository.UserPromocodeAsyn(userId, promo);

            return Ok();
        }
    }
}
