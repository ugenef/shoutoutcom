using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Mapster;
using Sol.DataLayer.Mongo;
using Sol.IdGen.Abstract;
using Sol.Users.Abstract;
using Sol.Users.Abstract.Model;
using Sol.Users.Impl.Dal.Model;

namespace Sol.Users.Impl
{
    internal class UserStorage : IUserStorage
    {
        private readonly IMongoRepo<UserDao> _db;
        private readonly IIdGenerator _idGenerator;

        public UserStorage(IMongoRepo<UserDao> db, IIdGenerator idGenerator)
        {
            _db = db;
            _idGenerator = idGenerator;
        }

        public async Task<User> CreateAsync(CreateUserParam param)
        {
            var user = new UserDao
            {
                ExtUserId = _idGenerator.GetId(),
                Email = param.Email,
                GivenName = param.GivenName,
                FamilyName = param.FamilyName,
                Locale = param.Locale,
                ImageUrl = param.ImageUrl,
                CreateDate = DateTime.Now
            };
            await _db.CreateAsync(user).ConfigureAwait(false);
            return user.Adapt<User>();
        }

        public Task<User?> FindByIdAsync(string extId)
        {
            return FindAsync(u => u.ExtUserId == extId);
        }

        public Task<User?> FindByEmailAsync(string email)
        {
            return FindAsync(u => u.Email == email);
        }

        private async Task<User?> FindAsync(Expression<Func<UserDao, bool>> filter)
        {
            var daos = await _db
                .FindAllAsync(filter)
                .ConfigureAwait(false);
            var dao = daos.SingleOrDefault();
            return dao?.Adapt<User>();
        }
    }
}