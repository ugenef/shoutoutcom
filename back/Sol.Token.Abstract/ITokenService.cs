using System.Threading.Tasks;

namespace Sol.Token.Abstract
{
    public interface ITokenService
    {
        Task<string> GetJwtWithGoogleIdAsync(string googleIdToken);
    }
}