using System.Threading.Tasks;
using Sol.Users.Abstract.Model;

namespace Sol.Users.Abstract
{
    public interface IUserStorage
    {
        Task<User> CreateAsync(string email);
        Task<User> GetAsync(string extId);
        Task<User?> FindAsync(string email);
    }
}