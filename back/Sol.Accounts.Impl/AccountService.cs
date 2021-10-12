using System.Threading.Tasks;
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

        public Task<Account> CreateAsync(CreateAccountParam param)
        {
            throw new System.NotImplementedException();
        }

        public Task<Account[]> FindByUserAsync(string extUserId)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateDescriptionAsync(string extAccId, string newDescription)
        {
            throw new System.NotImplementedException();
        }

        public Task IncrementClicksAsync(string extAccId)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteAsync(string extAccId)
        {
            throw new System.NotImplementedException();
        }
    }
}