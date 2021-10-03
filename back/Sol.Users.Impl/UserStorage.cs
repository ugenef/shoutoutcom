using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Sol.Users.Abstract;
using Sol.Users.Abstract.Model;

namespace Sol.Users.Impl
{
    internal class UserStorage : IUserStorage
    {
        private readonly ConcurrentDictionary<string, User> _str = new();


        public Task<User> CreateAsync(string email)
        {
            var user = new User
            {
                Email = email,
                ExtId = Guid.NewGuid().ToString("N")
            };
            _str[user.ExtId] = user;
            return Task.FromResult(user);
        }

        public Task<User> GetAsync(string extId)
        {
            return Task.FromResult(_str[extId]);
        }

        public Task<User?> FindAsync(string email)
        {
            return Task.FromResult<User>(null);
        }
    }
}