using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Sol.Accounts.Abstract;
using Sol.Accounts.Abstract.Model;

namespace Sol.Accounts.Impl
{
    //no-distributed variation
    internal class AccountCache : IAccountCache
    {
        private readonly IMemoryCache _cache;
        private readonly IAccountService _service;
        private readonly ILogger<AccountCache> _logger;

        private readonly TimeSpan _expiration = TimeSpan.FromMinutes(15);
        private const string CachingKey = "ScoredAccounts_2d65994a-6d7e-43d9-99d0-edf9bb0a5028";
        public AccountCache(
            IAccountService service, 
            ILogger<AccountCache> logger)
        {
            _service = service;
            _logger = logger;

            //Microsoft.Extensions.Caching.Redis <-- distributed case
            _cache = new MemoryCache(new MemoryCacheOptions
            {
                ExpirationScanFrequency = TimeSpan.FromMinutes(1),
            });
        }

        public async Task<IEnumerable<Account>> FindAllSortedByScoreDescAsync()
        {
            return await GetCachedAsync().ConfigureAwait(false);
        }

        private async Task<Account[]> GetCachedAsync()
        {
            return await _cache.GetOrCreateAsync(CachingKey, entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = _expiration;
                return FindSortedAccountsAsync();
            });
        }

        public void Invalidate()
        {
            RecalculateScoreAsync();
        }

        //All update commands are equal, so we can limit
        //the max size of enqueued updates by 2:
        //one update command is actually working, another one is waiting.
        //The waiting one will put the actual version to the cache anyway.
        private readonly SemaphoreSlim _queueSem = new(2, 2);
        private readonly SemaphoreSlim _workerSem = new(1, 1);

        private async Task RecalculateScoreAsync()
        {
            try
            {
                Console.WriteLine("outer");
                await _queueSem.WaitAsync(0).ConfigureAwait(false);
                try
                {
                    Console.WriteLine("inner");
                    await _workerSem.WaitAsync().ConfigureAwait(false);
                    Console.WriteLine("worker");
                    var newOrdering = await FindSortedAccountsAsync().ConfigureAwait(false);
                    _cache.Set(CachingKey, newOrdering, _expiration);
                }
                finally
                {
                    _workerSem.Release();
                    _queueSem.Release();
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error when recalculating scores");
            }
            Console.WriteLine("exit");
        }

        private async Task<Account[]> FindSortedAccountsAsync()
        {
            var accounts = await _service.FindAllActiveAsync().ConfigureAwait(false);
            return SortByScoreDescAsync(accounts);
        }

        private Account[] SortByScoreDescAsync(Account[] accounts)
        {
            var finalOrdering = new Account[accounts.Length];

            var accountsWithManualRating = accounts
                .Where(a => IsInManualRating(a, accounts.Length))
                .OrderBy(a => a.Score.ManualRating)
                .ToArray();

            var clicksRating = accounts
                .Except(accountsWithManualRating)
                .OrderByDescending(a => a.Stat.ClicksCount);

            foreach (var account in accountsWithManualRating)
            {
                finalOrdering[account.Score.ManualRating.Value - 1] = account;
            }

            var pos = 0;
            foreach (var account in clicksRating)
            {
                while (pos < accounts.Length && finalOrdering[pos] != null)
                {
                    pos++;
                }

                finalOrdering[pos] = account;
            }

            return finalOrdering;
        }

        private bool IsInManualRating(Account a, int maxRating)
        {
            var manualRating = a.Score.ManualRating;
            return manualRating > 0 && manualRating <= maxRating + 1;
        }
    }
}