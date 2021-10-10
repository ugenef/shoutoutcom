using Microsoft.IdentityModel.Tokens;

namespace Sol.Token.Impl.Config
{
    internal interface IJwtConfig
    {
        string ValidIssuer { get; init; }
        string ValidAudience { get; init; }
        SecurityKey IssuerSigningKey { get; init; }
    }
}