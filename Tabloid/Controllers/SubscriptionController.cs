using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionRepository _subRepo;
        private readonly IUserProfileRepository _userProfileRepo;
        public SubscriptionController(ISubscriptionRepository subscriptionRepository, IUserProfileRepository userProfileRepository)
        {
            _subRepo = subscriptionRepository;
            _userProfileRepo = userProfileRepository;
        }

        // GET api/<SubscriptionController>
        [HttpGet]
        public IActionResult GetByAuthorId(string authorId)
        {
            UserProfile user = GetCurrentUserProfile();
            bool isSubbed = _subRepo.SubCheck(user.Id, int.Parse(authorId));
            if (isSubbed)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<SubscriptionController>
        [HttpPost]
        public IActionResult Post(Subscription subscription)
        {
            UserProfile user = GetCurrentUserProfile();
            if (user == null || subscription.ProviderUserProfileId == 0)
            {
                return BadRequest();
            }

            subscription.SubscriberUserProfileId = user.Id;
            subscription.BeginDateTime = DateTime.Now;
            
            _subRepo.Add(subscription);
            return NoContent();
        }

        // PUT api/<SubscriptionController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SubscriptionController>/5
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
