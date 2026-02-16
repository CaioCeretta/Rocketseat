using Microsoft.AspNetCore.Mvc;
using MyFirstAPI.Communication.Requests;
using MyFirstAPI.Communication.Responses;

namespace MyFirstAPI.Controllers
     
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        //Query Params Example
        //[HttpGet]
        //[ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        //public IActionResult GetQueryParams(int id, string nickname)
        //{
        //    var response = new User
        //    {
        //        Id = 1,
        //        Name = "Caio",
        //        Age = 29,
        //    };

        //    return Ok("Caio");
          
        //}

        // Route Params Example
        [HttpGet]
        [Route("{id}")]
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
		[ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult Update([FromRoute] int id, [FromBody] RequestUpdateUserProfileJson request)
        {
            return NoContent();
        }

		[HttpDelete]
		[Route("{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		public IActionResult Delete([FromRoute] int id)
		{
			return NoContent();
		}

        [HttpGet]
		[ProducesResponseType(typeof(List<User>), StatusCodes.Status200OK)]

		public IActionResult GetAll()
        {
            var response = new List<User>()
           {
                new User { Id = 1, Age = 7, Name = "Blub"},
			    new User { Id = 2, Age = 30, Name = "Caio"},

		   };

            return Ok();
        }



		[HttpPut("update-password")]
		[Route("{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		public IActionResult ChangePassword([FromRoute] int id, [FromBody] RequestChangePasswordJson request)
		{
			return NoContent();
		}

		[HttpPut("update-password2")]
		[Route("{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		public IActionResult ChangePassword2([FromRoute] int id, [FromBody] RequestChangePasswordJson request)
		{
			return NoContent();
		}


	}
} 
 