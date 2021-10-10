using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Sol.DataLayer.Mongo.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSolMongo(
            this IServiceCollection services,
            string connString,
            string database)
        {
            var config = new MongoConfig
            {
                ConnString = connString, 
                Database = database
            };
            
            services.TryAddSingleton<IMongoConfig>(config);
            services.TryAddSingleton<IMongoDbFactory, MongoDbFactory>();
            return services;
        }

        public static IServiceCollection AddSolMongoRepo<T>(
            this IServiceCollection services)
        {
            services.TryAddSingleton<IMongoRepo<T>, MongoRepo<T>>();
            return services;
        }
    }
}