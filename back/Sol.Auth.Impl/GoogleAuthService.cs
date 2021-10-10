using System;
using System.Security.Authentication;
using System.Threading;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using Sol.Auth.Abstract;
using Sol.Auth.Abstract.Model;

namespace Sol.Auth.Impl
{
    internal class GoogleAuthService : IGoogleAuthService
    {
        public async Task<GoogleAuthResult> AuthAsync(string googleIdToken)
        {
            var res = await GoogleJsonWebSignature.ValidateAsync(googleIdToken).ConfigureAwait(false);
            _ = res ?? throw new AuthenticationException("Invalid Google Id Token");

            return new GoogleAuthResult
            {
                Email = res.Email,
                GivenName = res.GivenName,
                FamilyName = res.FamilyName,
                Locale = res.Locale,
                ImageUrl = res.Picture
            };
        }
    }
}