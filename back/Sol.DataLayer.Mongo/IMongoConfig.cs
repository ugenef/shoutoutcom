namespace Sol.DataLayer.Mongo
{
    internal interface IMongoConfig
    {
        string Database { get; }
        string ConnString { get; }
    }
}