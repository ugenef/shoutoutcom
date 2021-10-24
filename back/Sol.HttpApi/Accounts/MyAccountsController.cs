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
        private readonly IAccountCache _cache;
        private readonly IAccountService _service;
        private readonly ILogger<MyAccountsController> _logger;

        public MyAccountsController(
            IAccountService service, 
            ILogger<MyAccountsController> logger, 
            IAccountCache cache)
        {
            _service = service;
            _logger = logger;
            _cache = cache;
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
            _cache.Invalidate();
            return new OkResult();
        }
        
        [HttpGet, Route("find-all")]
        [ProducesResponseType(typeof(MyAccountDto[]), 200)]
        public async Task<IActionResult> FindMyAsync()
        {
            var extUserId = GetExtUserId();
            var accounts = await _service.FindByUserAsync(extUserId).ConfigureAwait(false);
            return new OkObjectResult(accounts.Adapt<MyAccountDto[]>());
        }
        
        [HttpPost, Route("update")]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateAccountDto dto)
        {
            var extUserId = GetExtUserId();
            var isOwner = await _service.IsOwnerAsync(dto.ExtAccountId, extUserId).ConfigureAwait(false);
            if (isOwner)
            {
                await _service.UpdateDescriptionAsync(dto.ExtAccountId, dto.NewDescription).ConfigureAwait(false);
                _cache.Invalidate();
                return new OkResult();
            }

            return new StatusCodeResult(403);
        }

        [HttpDelete, Route("{extAccountId}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] string extAccountId)
        {
            var extUserId = GetExtUserId();
            var isOwner = await _service.IsOwnerAsync(extAccountId, extUserId).ConfigureAwait(false);
            if (isOwner)
            {
                await _service.DeleteAsync(extAccountId).ConfigureAwait(false);
                _cache.Invalidate();
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