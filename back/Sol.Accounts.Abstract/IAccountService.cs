using System.Threading.Tasks;
using Sol.Accounts.Abstract.Model;

namespace Sol.Accounts.Abstract
{
    public interface IAccountService
    {
        Task<Account> CreateAsync(CreateAccountParam param);
        Task<Account[]> FindByUserAsync(string extUserId);
        Task UpdateDescriptionAsync(string extAccId, string newDescription);
        Task IncrementClicksAsync(string extAccId);
        Task DeleteAsync(string extAccId);
        Task<bool> IsOwnerAsync(string extAccId, string extUserId);
        Task<Account[]> FindAllActiveAsync();
    }
}