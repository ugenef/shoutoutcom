using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Sol.Auth.Abstract;
using Sol.Auth.Abstract.Model;

namespace Sol.Auth.Impl
{
    internal class JwtFactory : IJwtFactory
    {
        private readonly JwtSecurityTokenHandler _tokenHandler;

        public JwtFactory()
        {
            _tokenHandler = new JwtSecurityTokenHandler();
        }

        public string Get(string sub, TimeSpan expiry, TokenValidationParameters tokenParams)
        {
            var claims = new Claim[] { new(ClaimConstants.Sub, sub) };

            var token = new JwtSecurityToken(
                tokenParams.ValidIssuer,
                tokenParams.ValidAudience,
                claims,
                expires: DateTime.Now.Add(expiry),
                signingCredentials: new SigningCredentials(tokenParams.IssuerSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return _tokenHandler.WriteToken(token);
        }
    }
}