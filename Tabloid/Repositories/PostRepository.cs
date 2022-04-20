using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetApprovedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName,
                              t.Id AS TagId,
                              t.[Name] AS TagName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                              LEFT JOIN PostTag pt ON pt.PostId = p.Id
                              LEFT JOIN Tag t ON pt.TagId = t.Id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                        ORDER BY PublishDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName,
                              t.Id AS TagId,
                              t.[Name] AS TagName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                              LEFT JOIN PostTag pt ON pt.PostId = p.Id
                              LEFT JOIN Tag t ON pt.TagId = t.Id
                         WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                        while (reader.Read())
                        {
                            post.Tags.Add(new Tag
                            {
                                Id = DbUtils.GetInt(reader, "TagId"),
                                Name = DbUtils.GetString(reader, "TagName")
                            });
                        }
                    }

                    reader.Close();

                    return post;
                }
            }
        }
<<<<<<< HEAD
        public void AddPostReaction(PostReaction postReaction)
=======

        public void AddPost(Post post)
>>>>>>> main
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
<<<<<<< HEAD
                    cmd.CommandText = @"INSERT INTO PostReaction (PostId, ReactionId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@postId, @reactionId, @userProfileId)";
                    cmd.Parameters.AddWithValue("@postId", postReaction.PostId);
                    cmd.Parameters.AddWithValue("@reactionId", postReaction.ReactionId);
                    cmd.Parameters.AddWithValue("@userProfileId", postReaction.UserProfileId);

                    postReaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public List<PostReaction> GetPostReactions()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, ReactionId, PostId, UserProfileId 
                                        FROM PostReaction";
                    var reader = cmd.ExecuteReader();
                    List<PostReaction> postReactions = new List<PostReaction>();
                    while (reader.Read())
                    {
                        PostReaction postReaction = new PostReaction
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            ReactionId = DbUtils.GetInt(reader, "ReactionId"),
                            PostId = DbUtils.GetInt(reader, "PostId")
                        };
                        postReactions.Add(postReaction);
                    }
                    conn.Close();
                    return postReactions;
                }
            }
        }

=======
                    cmd.CommandText = @"INSERT INTO Post (Title, Content, ImageLocation, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@title, @content, @imageLocation, @createDate, @publishDate, @isApproved, @categoryId, @userProfileId)";

                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@imageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@createDate", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@publishDate", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@isApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@userProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
>>>>>>> main
        private Post NewPostFromReader(SqlDataReader reader)
        {
            Post post = new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                },
                Tags = new List<Tag>()
            };
                if (DbUtils.IsNotDbNull(reader, "TagId"))
                {
                    post.Tags.Add(new Tag()
                    {
                        Id = DbUtils.GetInt(reader, "TagId"),
                        Name = DbUtils.GetString(reader, "TagName")
                    });
                }
            return post;
        }
    }
}
