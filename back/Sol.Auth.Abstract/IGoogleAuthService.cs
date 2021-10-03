using System.Threading.Tasks;
using Sol.Auth.Abstract.Model;

namespace Sol.Auth.Abstract
{
    public interface IGoogleAuthService
    {
        Task<GoogleAuthResult> AuthAsync(string googleIdToken);
    }
}