namespace Sol.Auth.Abstract.Model
{
    public class GoogleAuthResult
    {
        public string Email { get; init; }
        public string GivenName { get; init; }
        public string FamilyName { get; init; }
        public string Locale { get; init; }
        public string? ImageUrl { get; init; }
    }
}