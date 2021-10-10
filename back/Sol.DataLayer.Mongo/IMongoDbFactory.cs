using MongoDB.Driver;

namespace Sol.DataLayer.Mongo
{
    internal interface IMongoDbFactory
    {
        IMongoDatabase GetDatabase();
    }
}