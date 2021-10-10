using System;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Sol.Auth.Abstract;
using Sol.Token.Abstract;
using Sol.Token.Impl.Config;
using Sol.Users.Abstract;

namespace Sol.Token.Impl.Service
{
    internal class TokenService : ITokenService
    {
        private readonly IJwtConfig _jwtConfig;
        private readonly IJwtFactory _jwtFactory;
        private readonly IUserStorage _userStorage;
        private readonly IGoogleAuthService _googleAuth;

        public TokenService(
            IUserStorage userStorage, 
            IJwtFactory jwtFactory, 
            IGoogleAuthService googleAuth, 
            IJwtConfig jwtConfig)
        {
            _userStorage = userStorage;
            _jwtFactory = jwtFactory;
            _googleAuth = googleAuth;
            _jwtConfig = jwtConfig;
        }

        public async Task<string> GetJwtWithGoogleIdAsync(string googleIdToken)
        {
            var googleAuthResult = await _googleAuth.AuthAsync(googleIdToken).ConfigureAwait(false);
            var user = await _userStorage.FindAsync(googleAuthResult.Email).ConfigureAwait(false) ?? 
                       await _userStorage.CreateAsync(googleAuthResult.Email).ConfigureAwait(false);

            return _jwtFactory.Get(user.ExtId, TimeSpan.FromDays(1), new TokenValidationParameters
            {
                ValidIssuer = _jwtConfig.ValidIssuer,
                ValidAudience = _jwtConfig.ValidAudience,
                IssuerSigningKey = _jwtConfig.IssuerSigningKey
            });
        }
    }
}