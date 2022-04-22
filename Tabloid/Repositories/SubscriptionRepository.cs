using Microsoft.Extensions.Configuration;
using Tabloid.Utils;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration config) : base(config) { }

        public void Add(Subscription sub)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Subscription (SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime)
                                        VALUES (@subUserProfileId, @provUserProfileId, @beginDateTime, NULL)";
                    DbUtils.AddParameter(cmd, "@subUserProfileId", sub.SubscriberUserProfileId);
                    DbUtils.AddParameter(cmd, "@provUserProfileId", sub.ProviderUserProfileId);
                    DbUtils.AddParameter(cmd, "@beginDateTime", sub.BeginDateTime);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public bool SubCheck(int currentUserId, int authorId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id from Subscription
                                        WHERE SubscriberUserProfileId = @currentUserId
                                        AND ProviderUserProfileId = @authorId
                                        AND EndDateTime IS NULL";
                    DbUtils.AddParameter(cmd, "@currentUserId", currentUserId);
                    DbUtils.AddParameter(cmd, "@authorId", authorId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        return reader.Read();
                    }
                }
            }
        }
    }
}
