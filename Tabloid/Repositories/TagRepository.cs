using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration config) : base(config) { }
        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM Tag Order By Name";
                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tag>();

                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return tags;
                }
            }
        }

        public Tag GetTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name
                        FROM Tag
                        WHERE Tag.Id = @id
                    ";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Tag tag = new Tag
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            };

                            return tag;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        public void CreateTag(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Tag (
                           Name )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Name )";
                    DbUtils.AddParameter(cmd, "@Name", tag.Name);


                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void EditTag(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Tag
                            SET 
                                [Name] = @name
                                
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    DbUtils.AddParameter(cmd, "@Id", tag.Id);


                    cmd.ExecuteNonQuery();
                }

            }

        }
    }
}