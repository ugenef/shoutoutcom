using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Sol.Auth.Impl.DependencyInjection;
using Sol.HttpApi.Token.Abstract;
using Sol.HttpApi.Token.Impl.Config;
using Sol.HttpApi.Token.Impl.Service;
using Sol.Users.Impl.DependencyInjection;

namespace Sol.HttpApi.Token.Impl.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddToken(this IServiceCollection services, ConfigurationManager config)
        {
            var jwtConfig = new JwtConfig
            {
                ValidIssuer = config["Jwt:ValidIssuer"],
                ValidAudience = config["Jwt:ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"])),
            };
            services.TryAddSingleton<IJwtConfig>(jwtConfig);
            services.TryAddSingleton<ITokenService, TokenService>();

            services.AddSolAuth();
            services.AddSolUsers();
            return services;
        }
    }
}