using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Sol.Accounts.Abstract;
using Sol.Accounts.Impl.Dal;
using Sol.DataLayer.Mongo.DependencyInjection;

namespace Sol.Accounts.Impl.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSolAccounts(
            this IServiceCollection services,
            string connectionString,
            string database)
        {
            services.AddSolMongo(connectionString, database);
            services.AddSolMongoRepo<AccountDao>();
            services.TryAddSingleton<IAccountService, AccountService>();
            services.TryAddSingleton<IAccountCache, AccountCache>();
            return services;
        }
    }
}