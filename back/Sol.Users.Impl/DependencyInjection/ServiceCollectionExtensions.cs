using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Sol.Users.Abstract;

namespace Sol.Users.Impl.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSolUsers(this IServiceCollection services)
        {
            services.TryAddSingleton<IUserStorage, UserStorage>();
            return services;
        } 
    }
}