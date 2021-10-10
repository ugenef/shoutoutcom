using Microsoft.IdentityModel.Tokens;

namespace Sol.Token.Impl.Config
{
    internal class JwtConfig : IJwtConfig
    {
        public string ValidIssuer { get; init; }
        public string ValidAudience { get; init; }
        public SecurityKey IssuerSigningKey { get; init; } 
    }
}