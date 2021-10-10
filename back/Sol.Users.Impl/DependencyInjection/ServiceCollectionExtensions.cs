using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Sol.DataLayer.Mongo.DependencyInjection;
using Sol.IdGenerator.Guid.DependencyInjection;
using Sol.Users.Abstract;
using Sol.Users.Impl.Dal.Model;

namespace Sol.Users.Impl.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSolUsers(
            this IServiceCollection services,
            string connString,
            string database)
        {
            services.AddSolMongo(connString, database);
            services.AddSolMongoRepo<UserDao>();
            services.AddSolGuidIdGenerator();
            services.TryAddSingleton<IUserStorage, UserStorage>();
            return services;
        } 
    }
}