using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void AddPostReaction(PostReaction postReaction);
        public List<PostReaction> GetPostReactions();
        List<Post> GetApprovedPosts();
        Post GetById(int id);
        void AddPost(Post post);
        void UpdatePost(Post post);
        void Delete(int id);
        List<Post> GetPostByCategoryId(int categoryId);
    }
}