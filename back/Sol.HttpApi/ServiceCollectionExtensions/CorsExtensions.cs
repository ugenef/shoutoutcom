using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;

namespace Sol.HttpApi.ServiceCollectionExtensions
{
    internal static class CorsExtensions
    {
        private static readonly Dictionary<string, string[]> AllowedHosts = new()
        {
            { "Development", new[]
            {
                "http://localhost:3000",
                "http://service.localhost",
                "https://service.localhost",
            } }
        };

        public static IServiceCollection AddSolCors(
            this IServiceCollection services,
            string env)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(env,
                    builder =>
                    {
                        builder.WithOrigins(AllowedHosts[env])
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            return services;
        }
    }
}