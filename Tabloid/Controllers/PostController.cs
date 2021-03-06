using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System;

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
            if (post.UserProfileId == currentUser.Id)
            {
                post.IsCurrentUserAuthor = true;
            }
            else
            {
                post.IsCurrentUserAuthor = false;
            }
            if ((post.PublishDateTime > DateTime.Now) || (!post.IsApproved))
            {
                if (post.IsCurrentUserAuthor == true)
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
        [HttpGet("PostReaction")]
        public IActionResult PostReaction()
        {
            return Ok(_postRepo.GetPostReactions());
        }

        [HttpPost("PostReaction")]
        public IActionResult PostReaction(PostReaction postReaction)
        {
            var user = GetCurrentUserProfile();
            postReaction.UserProfileId = user.Id;
            _postRepo.AddPostReaction(postReaction);
            return Ok();
        }

        // POST api/<PostController>
        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.UserProfileId = GetCurrentUserProfile().Id;
            post.CreateDateTime = DateTime.Now;
            if (string.IsNullOrWhiteSpace(post.ImageLocation))
            {
                post.ImageLocation = null;
            }
            _postRepo.AddPost(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepo.UpdatePost(post);
            return NoContent();
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepo.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("PostByCategory")]
        public IActionResult PostByCategory(int categoryId)
        {
            return Ok(_postRepo.GetPostByCategoryId(categoryId));
        }
    }
}
