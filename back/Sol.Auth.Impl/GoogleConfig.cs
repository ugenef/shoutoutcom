namespace Sol.Auth.Impl
{
    internal class GoogleConfig : IGoogleConfig
    {
        public string ClientId { get; init; }
        public string ClientSecret { get; init; }
    }
}