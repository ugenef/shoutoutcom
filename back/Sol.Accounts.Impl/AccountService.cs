using System;
using System.Threading.Tasks;
using Mapster;
using MongoDB.Driver;
using Sol.Accounts.Abstract;
using Sol.Accounts.Abstract.Model;
using Sol.Accounts.Impl.Dal;
using Sol.DataLayer.Mongo;
using Sol.IdGen.Abstract;

namespace Sol.Accounts.Impl
{
    internal class AccountService : IAccountService
    {
        private readonly IIdGenerator _idGenerator;
        private readonly IMongoRepo<AccountDao> _db;

        public AccountService(
            IIdGenerator idGenerator,
            IMongoRepo<AccountDao> db)
        {
            _db = db;
            _idGenerator = idGenerator;
        }

        public async Task<Account> CreateAsync(CreateAccountParam param)
        {
            var dao = new AccountDao
            {
                ExtAccountId = _idGenerator.GetId(),
                ExtUserId = param.ExtUserId,
                Name = param.Name,
                Link = $"https://www.instagram.com/{param.Name.TrimStart('@')}/",
                Description = param.Description,
                CreateDate = DateTime.Now,
                UpdateDate = DateTime.Now,
                DeleteDate = null,
                Stat = new AccountDao.Statistics { ClicksCount = 0 },
                Score = new AccountDao.Scoring(),
            };
            await _db.CreateAsync(dao).ConfigureAwait(false);
            return dao.Adapt<Account>();
        }

        public async Task<Account[]> FindByUserAsync(string extUserId)
        {
            var daos = await _db
                .FindAllAsync(a => a.ExtUserId == extUserId && a.DeleteDate == null)
                .ConfigureAwait(false);
            return daos.Adapt<Account[]>();
        }

        public async Task<Account[]> FindAllActiveAsync()
        {
            var daos = await _db
                .FindAllAsync(a => a.DeleteDate == null)
                .ConfigureAwait(false);
            return daos.Adapt<Account[]>();
        }

        public Task UpdateDescriptionAsync(string extAccId, string newDescription)
        {
            var builder = Builders<AccountDao>
                .Update
                .Set(a => a.Description, newDescription)
                .Set(a => a.UpdateDate, DateTime.Now);
            return _db
                .UpdateOneAsync(a => a.ExtAccountId == extAccId, builder);
        }

        public Task IncrementClicksAsync(string extAccId)
        {
            var builder = Builders<AccountDao>
                .Update
                .Inc(a => a.Stat.ClicksCount, 1);
            return _db
                .UpdateOneAsync(a => a.ExtAccountId == extAccId, builder);
        }

        public Task DeleteAsync(string extAccId)
        {
            var now = DateTime.Now;
            var builder = Builders<AccountDao>
                .Update
                .Set(a => a.DeleteDate, now)
                .Set(a => a.UpdateDate, now);
            return _db.UpdateOneAsync(a => a.ExtAccountId == extAccId, builder);
        }

        public async Task<bool> IsOwnerAsync(string extAccId, string extUserId)
        {
            var account = await _db
                .GetAsync(a => a.ExtAccountId == extAccId)
                .ConfigureAwait(false);
            return account.ExtUserId == extUserId;
        }
    }
}