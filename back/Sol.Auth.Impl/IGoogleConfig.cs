namespace Sol.Auth.Impl
{
    internal interface IGoogleConfig
    {
        string ClientId { get; init; }
        string ClientSecret { get; init; }
    }
}