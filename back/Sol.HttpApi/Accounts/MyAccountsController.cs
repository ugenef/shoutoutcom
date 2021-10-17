using System;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sol.Accounts.Abstract;
using Sol.Accounts.Abstract.Model;
using Sol.Auth.Abstract.Model;
using Sol.HttpApi.Accounts.Model;

namespace Sol.HttpApi.Accounts
{
    [Authorize]
    [Route($"{ApiConstants.ApiV1}/accounts/my")]
    public class MyAccountsController : Controller
    {
        private readonly IAccountService _service;
        private readonly ILogger<MyAccountsController> _logger;

        public MyAccountsController(
            IAccountService service, 
            ILogger<MyAccountsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpPost, Route("create")]
        public async Task<IActionResult> CreateAsync([FromBody] CreateAccountDto dto)
        {
            var param = new CreateAccountParam
            {
                ExtUserId = GetExtUserId(),
                Name = dto.Name,
                Description = dto.Description
            };

            await _service.CreateAsync(param).ConfigureAwait(false);
            return new OkResult();
        }
        
        [HttpGet, Route("find-all")]
        [ProducesResponseType(typeof(AccountDto[]), 200)]
        public async Task<IActionResult> FindMyAsync()
        {
            var extUserId = GetExtUserId();
            var accounts = await _service.FindByUserAsync(extUserId).ConfigureAwait(false);
            return new OkObjectResult(accounts.Adapt<AccountDto[]>());
        }
        
        [HttpPost, Route("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateAccountDto dto)
        {
            var extUserId = GetExtUserId();
            var isOwner = await _service.IsOwnerAsync(dto.ExtAccId, extUserId).ConfigureAwait(false);
            if (isOwner)
            {
                await _service.UpdateDescriptionAsync(dto.ExtAccId, dto.NewDescription).ConfigureAwait(false);
                return new OkResult();
            }

            return new StatusCodeResult(403);
        }

        private string GetExtUserId()
        {
            return HttpContext
                .User
                .Claims
                .Single(c => c.Type == ClaimConstants.Sub)
                .Value;
        }
    }
}