using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sol.Accounts.Impl.Dal
{
    [Table("accounts")]
    internal class AccountDao
    {
        public string ExtAccountId { get; set; }
        public string ExtUserId { get; set; }
        public string Name { get; init; }
        public string Description { get; init; }
        public DateTime CreateDate { get; init; }
        public DateTime UpdateDate { get; init; }
        public DateTime? DeleteDate { get; init; }
        public Statistics Stat { get; init; }

        public class Statistics
        {
            public long ClicksCount { get; init; }
        }
    }
}