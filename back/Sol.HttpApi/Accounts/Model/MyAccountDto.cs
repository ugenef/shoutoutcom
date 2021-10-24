using System;

namespace Sol.HttpApi.Accounts.Model
{
    public class MyAccountDto
    {
        public string ExtAccountId { get; set; }
        public string ExtUserId { get; set; }
        public string Name { get; init; }
        public string Link { get; init; }
        public string Description { get; init; }
        public DateTime CreateDate { get; init; }
        public DateTime UpdateDate { get; init; }
        public Statistics Stat { get; init; }

        public class Statistics
        {
            public long ClicksCount { get; init; }
        }
    }
}