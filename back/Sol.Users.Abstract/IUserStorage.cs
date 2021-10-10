using System.Threading.Tasks;
using Sol.Users.Abstract.Model;

namespace Sol.Users.Abstract
{
    public interface IUserStorage
    {
        Task<User> CreateAsync(CreateUserParam param);
        Task<User?> FindByIdAsync(string extId);
        Task<User?> FindByEmailAsync(string email);
    }
}