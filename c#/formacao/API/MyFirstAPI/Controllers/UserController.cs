using Microsoft.AspNetCore.Mvc;

namespace MyFirstAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult GET()
        {
            var response = new Response
            {
                Name = "Caio",
                Age = 29
            };

            return Ok(response);
        }
             
    }
}
