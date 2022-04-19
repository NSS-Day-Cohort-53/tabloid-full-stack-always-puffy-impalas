using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepo;
        private readonly IUserProfileRepository _userProfileRepo;
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepo = postRepository;
            _userProfileRepo = userProfileRepository;
        }
        // GET: api/<PostController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepo.GetApprovedPosts());
        }

        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            var currentUser = GetCurrentUserProfile();
            if ((post.PublishDateTime > System.DateTime.Now) || (!post.IsApproved))
            {
                if (post.UserProfileId == currentUser.Id)
                {
                    return Ok(post);
                }
                else if (currentUser.UserTypeId == 1)
                {
                    return Ok(post);
                }
                else
                {
                    return NotFound();
                }
            }
            return Ok(post);
        }

        // POST api/<PostController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
