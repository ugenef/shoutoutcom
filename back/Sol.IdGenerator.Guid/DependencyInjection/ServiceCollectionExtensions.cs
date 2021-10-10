using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Sol.IdGen.Abstract;

namespace Sol.IdGenerator.Guid.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSolGuidIdGenerator(this IServiceCollection services)
        {
            services.TryAddSingleton<IIdGenerator, GuidGenerator>();
            return services;
        }
    }
}