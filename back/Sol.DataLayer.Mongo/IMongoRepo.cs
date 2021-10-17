using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Sol.DataLayer.Mongo
{
    //I dont separate data layer onto abstract and implementation
    //libs, because Mongo.Driver and EF have very different APIs
    //for data manipulation (as well as Mongo and RDBMS themselves),
    //so that is a very laborious task to make the single interface
    //to access them both and still be able to use all the features.
    //For example, Update is very different in Mongo and EF, and
    //Mongo`s classic data model doesnt suggest the use of FK.
    public interface IMongoRepo<T>
    {
        Task CreateAsync(T entity);
        Task<T[]> FindAllAsync(Expression<Func<T, bool>> filter);
        Task UpdateOneAsync(Expression<Func<T, bool>> filter, UpdateDefinition<T> update);
        Task RemoveManyAsync(Expression<Func<T, bool>> filter);
        Task<T> GetAsync(Expression<Func<T, bool>> filter);
    }
}