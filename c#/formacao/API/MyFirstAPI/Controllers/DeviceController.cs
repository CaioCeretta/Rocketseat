using Microsoft.AspNetCore.Mvc;
using MyFirstAPI.Communication.Requests;
using MyFirstAPI.Communication.Responses;

namespace MyFirstAPI.Controllers

{

    public class DeviceController : MyFirstApiBaseController
    {
        [HttpGet]
        public IActionResult Get()
        {
            Author = "Regina";
            return Ok(Author);
        }

    }
}
