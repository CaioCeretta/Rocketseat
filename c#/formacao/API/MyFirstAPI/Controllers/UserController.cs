using Microsoft.AspNetCore.Mvc;

namespace MyFirstAPI.Controllers
     
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult GET(int id, string nickname)
        {
            var response = new User
            { 
                Id = 1,
                Name = "Caio",
                Age = 29        
            };

            return Ok(response); 
        }
             
    }
}
 