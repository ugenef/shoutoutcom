using System;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Sol.Auth.Impl.DependencyInjection;
using Sol.Token.Abstract;
using Sol.Token.Impl.Config;
using Sol.Token.Impl.Service;
using Sol.Users.Impl.DependencyInjection;

namespace Sol.Token.Impl.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSolToken(
            this IServiceCollection services,
            Action<AddTokenOptions> configure)
        {
            var options = new AddTokenOptions();
            configure(options);

            var jwtConfig = new JwtConfig
            {
                ValidIssuer = options.ValidIssuer,
                ValidAudience = options.ValidAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.Key)),
            };
            services.TryAddSingleton<IJwtConfig>(jwtConfig);
            services.TryAddSingleton<ITokenService, TokenService>();

            services.AddSolAuth();
            services.AddSolUsers();
            return services;
        }
    }
}