using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Sol.DataLayer.Mongo
{
    internal class MongoRepo<T> : IMongoRepo<T>
    {
        private readonly IMongoDbFactory _dbFactory;
        private readonly string _collectionName = GetCollectionName();

        public MongoRepo(IMongoDbFactory dbFactory)
        {
            _dbFactory = dbFactory;
        }

        public Task CreateAsync(T entity)
        {
            return GetCollection().InsertOneAsync(entity);
        }

        public async Task<T[]> FindAllAsync(Expression<Func<T, bool>> filter)
        {
            var list = await GetCollection()
                .Find(filter)
                .ToListAsync();

            return list.ToArray();
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> filter)
        {
            var list = await GetCollection()
                .Find(filter)
                .ToListAsync();

            return list.Single();
        }

        public Task UpdateOneAsync(Expression<Func<T, bool>> filter, UpdateDefinition<T> update)
        {
            return GetCollection().UpdateOneAsync(filter, update);
        }

        public Task RemoveManyAsync(Expression<Func<T, bool>> filter)
        {
            return GetCollection().DeleteManyAsync(filter);
        }

        private IMongoCollection<T> GetCollection()
        {
            return _dbFactory
                .GetDatabase()
                .GetCollection<T>(_collectionName);
        }

        private static string GetCollectionName()
        {
            var tableAttribute = typeof(T).GetCustomAttribute<TableAttribute>();
            if (tableAttribute != null)
            {
                return tableAttribute.Name;
            }

            var typeName = typeof(T).Name;
            if (typeName.Length == 0)
                throw new ArgumentException();

            return typeName.Length == 1
                ? char.ToLowerInvariant(typeName[0]).ToString()
                : char.ToLowerInvariant(typeName[0]) + typeName[1..];
        }
    }
}