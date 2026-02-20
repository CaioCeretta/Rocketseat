using Microsoft.AspNetCore.Mvc;
using MyFirstAPI.Communication.Requests;
using MyFirstAPI.Communication.Responses;

namespace MyFirstAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class MyFirstApiBaseController : ControllerBase
    {
        public string Author { get; set; } = "Caio Ceretta";
    }
}
