namespace Sol.Accounts.Abstract.Model
{
    public class CreateAccountParam
    {
        public string ExtUserId { get; set; }
        public string Name { get; init; }
        public string Description { get; init; }
    }
}