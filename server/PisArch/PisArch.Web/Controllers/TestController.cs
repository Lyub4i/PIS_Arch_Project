using Microsoft.AspNetCore.Mvc;

namespace PisArch.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("version")]
        public IActionResult GetVersion()
        {
            return Ok("1.0");
        }
    }
}
