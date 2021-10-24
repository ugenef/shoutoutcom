﻿using System;

namespace Sol.Accounts.Abstract.Model
{
    public class Account
    {
        public string ExtAccountId { get; set; }
        public string ExtUserId { get; set; }
        public string Name { get; init; }
        public string Link { get; init; }
        public string Description { get; init; }
        public DateTime CreateDate { get; init; }
        public DateTime UpdateDate { get; init; }
        public DateTime? DeleteDate { get; init; }
        public Statistics Stat { get; init; }
        public Scoring Score { get; init; }

        public class Statistics
        {
            public long ClicksCount { get; init; }
        }

        public class Scoring
        {
            public int? ManualRating { get; init; }
        }
    }
}