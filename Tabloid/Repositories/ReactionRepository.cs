using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(Reaction reaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Reaction (Name, ImageLocation)
                                        OUTPUT INSERTED.ID
                                        Values (@name, @imageLocation)";
                    DbUtils.AddParameter(cmd, "@name", reaction.Name);
                    DbUtils.AddParameter(cmd, "@imageLocation", reaction.ImageLocation);

                    reaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
