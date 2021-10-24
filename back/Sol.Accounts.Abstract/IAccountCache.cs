using System.Collections.Generic;
using System.Threading.Tasks;
using Sol.Accounts.Abstract.Model;

namespace Sol.Accounts.Abstract
{
    public interface IAccountCache
    {
        Task<IEnumerable<Account>> FindAllSortedByScoreDescAsync();
        void Invalidate();
    }
}