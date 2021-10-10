using Sol.IdGen.Abstract;

namespace Sol.IdGenerator.Guid
{
    internal class GuidGenerator : IIdGenerator
    {
        public string GetId()
        {
            return System.Guid.NewGuid().ToString("N");
        }
    }
}