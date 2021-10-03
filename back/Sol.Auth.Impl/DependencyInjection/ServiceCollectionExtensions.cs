using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Sol.Auth.Abstract;

namespace Sol.Auth.Impl.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSolAuth(this IServiceCollection services)
        {
            services.TryAddSingleton<IJwtFactory, JwtFactory>();
            services.TryAddSingleton<IGoogleAuthService, GoogleAuthService>();
            return services;
        }
    }
}