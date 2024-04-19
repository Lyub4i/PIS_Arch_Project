using Microsoft.AspNetCore.Mvc;
using PisArch.Infrastructure.Repositories;

namespace PisArch.Web.Controllers
{
    [Route(("[controller]"))]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly CourseRepository _courseRepository;

        public CourseController(CourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet("course")]
        public async Task<IActionResult> GetCourseInfo(long userId, long courseId)
        {
            if (await _courseRepository.IsUserStudy(userId, courseId))
            {
                return Ok(_courseRepository.GetCourse(courseId));
            }

            return Ok();
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses()
        {
            return Ok(await _courseRepository.GetCourses());
        }

        [HttpGet("myCourses")]
        public async Task<IActionResult> GetMyCourses(long userId)
        {
            var courses = await _courseRepository.GetMyCourses(userId);

            if (courses == null)
            {
                return NotFound();
            }

            return Ok(courses);
        }

        //[HttpPost("registerInCourse")]
        //public async Task<IActionResult> RegisterInCourse(long userId, long courseId)
        //{

        //}
    }
}
