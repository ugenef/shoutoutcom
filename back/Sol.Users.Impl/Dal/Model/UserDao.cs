using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sol.Users.Impl.Dal.Model
{
    [Table("users")]
    internal class UserDao
    {
        public string ExtUserId { get; init; }
        public string Email { get; init; }
        public string GivenName { get; init; }
        public string FamilyName { get; init; }
        public string Locale { get; init; }
        public string? ImageUrl { get; init; }
        public DateTime CreateDate { get; init; }
    }
}