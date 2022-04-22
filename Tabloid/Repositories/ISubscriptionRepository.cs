using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription sub);
        bool SubCheck(int currentUserId, int authorId);
    }
}