using System;
using Microsoft.IdentityModel.Tokens;

namespace Sol.Auth.Abstract
{
    public interface IJwtFactory
    {
        string Get(string sub, TimeSpan expiry, TokenValidationParameters tokenParams);
    }
}