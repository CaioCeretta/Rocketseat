using Microsoft.AspNetCore.Mvc;
using MyFirstAPI.Communication.Requests;
using MyFirstAPI.Communication.Responses;

namespace MyFirstAPI.Controllers
     
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult GetById([FromHeader] int id, [FromHeader] string nickname)
        {
            var response = new User
            {
                Id = 1,
                Name = "Caio",
                Age = 29
            };

            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseRegisterUserJson), StatusCodes.Status201Created)]
        public IActionResult CreateUser([FromBody] RequestRegisterUserJson request)
        {

            var response = new ResponseRegisterUserJson
            {
                Id = 1,
                Name = request.Name
            };


            return Created(string.Empty, response);
        }

        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult Update([FromRoute] int id, [FromBody] RequestUpdateUserProfileJson request)
        {
            return NoContent();
        }
             
    }
} 
 