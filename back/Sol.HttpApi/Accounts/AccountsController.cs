using System;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sol.Accounts.Abstract;
using Sol.HttpApi.Accounts.Model;

namespace Sol.HttpApi.Accounts
{
    [Route($"{ApiConstants.ApiV1}/accounts")]
    public class AccountsController : Controller
    {
        private readonly IAccountService _service;
        private readonly IAccountCache _cache;
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(
            IAccountService service, 
            ILogger<AccountsController> logger, 
            IAccountCache cache)
        {
            _service = service;
            _logger = logger;
            _cache = cache;
        }

        [HttpPost, Route("find-all")]
        [ProducesResponseType(typeof(AccountDto[]), 200)]
        public async Task<IActionResult> FindAsyncAsync([FromBody] AccountFilter filter)
        {
            var accounts = await _cache
                .FindAllSortedByScoreDescAsync()
                .ConfigureAwait(false);
            var result = accounts
                .Skip(filter.Skip)
                .Take(filter.Take)
                .ToArray();

            return new OkObjectResult(result.Adapt<AccountDto[]>());
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