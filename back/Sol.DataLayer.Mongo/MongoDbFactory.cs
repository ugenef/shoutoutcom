using System;
using System.Threading;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Sol.DataLayer.Mongo
{
    internal class MongoDbFactory : IMongoDbFactory
    {
        private readonly IMongoConfig _config;
        private readonly Lazy<MongoClient> _client;

        public MongoDbFactory(IMongoConfig config)
        {
            _config = config;
            _client = new Lazy<MongoClient>(() => new MongoClient(config.ConnString), 
                LazyThreadSafetyMode.ExecutionAndPublication);
            RegisterConventionsIdempotent();
        }

        private void RegisterConventionsIdempotent()
        {
            var conv = new ConventionPack
            {
                new IgnoreExtraElementsConvention(true),
                new CamelCaseElementNameConvention()
            };
            ConventionRegistry.Register("conv", conv, t => true);
        }

        public IMongoDatabase GetDatabase()
        {
            return _client.Value.GetDatabase(_config.Database);
        }
    }
}