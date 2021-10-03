using System.Threading.Tasks;

namespace Sol.HttpApi.Token.Abstract
{
    public interface ITokenService
    {
        Task<string> GetJwtWithGoogleIdAsync(string googleIdToken);
    }
}