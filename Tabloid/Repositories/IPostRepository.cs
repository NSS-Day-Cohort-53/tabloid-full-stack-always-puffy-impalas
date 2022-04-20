using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        void AddPostReaction(PostReaction postReaction);
        List<Post> GetApprovedPosts();
        Post GetById(int id);
    }
}