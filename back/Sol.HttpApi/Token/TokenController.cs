using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sol.HttpApi.Token.Dto;
using Sol.Token.Abstract;

namespace Sol.HttpApi.Token
{
    [ApiController]
    [Route("token")]
    public class TokenController
    {
        private readonly ITokenService _tokenService;
        private readonly ILogger<TokenController> _logger;

        public TokenController(
            ILogger<TokenController> logger,
            ITokenService tokenService)
        {
            _logger = logger;
            _tokenService = tokenService;
        }

        [HttpPost, Route("google")]
        public async Task<GoogleIdTokenResponseDto> GetTokenWithGoogleIdAsync([FromBody] GoogleIdTokenRequestDto request)
        {
            var jwt = await _tokenService.GetJwtWithGoogleIdAsync(request.IdToken);
            return new GoogleIdTokenResponseDto { Jwt = jwt };
        }
    }
}