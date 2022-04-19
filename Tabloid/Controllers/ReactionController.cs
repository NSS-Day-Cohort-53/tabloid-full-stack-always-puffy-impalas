using Microsoft.AspNetCore.Http;
using System;
using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepository;
        public ReactionController(IReactionRepository reactionRepository)
        {
            _reactionRepository = reactionRepository;
        }

        [HttpPost]
        public IActionResult Post(Reaction reaction)
        {
            _reactionRepository.Add(reaction);
            return Ok();
        }
    }
}
