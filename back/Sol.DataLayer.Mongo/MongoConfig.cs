namespace Sol.DataLayer.Mongo
{
    internal class MongoConfig : IMongoConfig
    {
        public string Database { get; init; }
        public string ConnString { get; init; }
    }
}