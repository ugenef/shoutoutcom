using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sol.Accounts.Abstract;
using Sol.HttpApi.Accounts.Model;

namespace Sol.HttpApi.Accounts
{
    [ApiController]
    [Authorize]
    [Route($"{ApiConstants.ApiV1}/accounts/my")]
    public class MyAccountsController
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
        public Task<IActionResult> CreateAsync([FromBody] CreateAccountDto dto)
        {
            
        }
        
        [HttpPost, Route("find-all")]
        [ProducesResponseType(typeof(AccountDto[]), 200)]
        public Task<IActionResult> FindMyAsync()
        {
            
        }
        
        [HttpPost, Route("update")]
        public Task<IActionResult> UpdateAsync([FromBody] UpdateAccountDto dto)
        {
            
        }
    }
}