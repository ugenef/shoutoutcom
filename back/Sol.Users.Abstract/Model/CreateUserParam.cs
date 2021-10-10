namespace Sol.Users.Abstract.Model
{
    public class CreateUserParam
    {
        public string Email { get; init; }
        public string GivenName { get; init; }
        public string FamilyName { get; init; }
        public string Locale { get; init; }
        public string? ImageUrl { get; init; }
    }
}