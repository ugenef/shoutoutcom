using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sol.Accounts.Abstract;

namespace Sol.HttpApi.Accounts
{
    [Route($"{ApiConstants.ApiV1}/accounts")]
    public class AccountsController : Controller
    {
        private readonly IAccountService _service;
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(IAccountService service, ILogger<AccountsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpPatch, Route("{extAccId}/clicks/inc")]
        public void IncrementClicksAsync([FromRoute] string extAccId)
        {
            FireAndForgetAsync(_service.IncrementClicksAsync(extAccId));
        }

        private async Task FireAndForgetAsync(Task task)
        {
            try
            {
                await task.ConfigureAwait(false);
            }
            catch (Exception e)
            {
                _logger.LogError(e, null);
            }
        }
    }
}