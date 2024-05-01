using Microsoft.AspNetCore.Mvc;
using PisArch.Domain.Models;
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

        [HttpGet("courseInfo")]
        public async Task<IActionResult> GetCourseInfo(long courseId)
        {
            return Ok(await _courseRepository.GetCourse(courseId));
        }

        [HttpGet("courses")]
        public async Task<IActionResult> GetCourses()
        {
            return Ok(await _courseRepository.GetCourses());
        }

        [HttpDelete("course")]
        public async Task DeleteCourse(long userId, long courseId)
        {
            //TODO: Check is user admin

            await _courseRepository.DeleteCourse(userId, courseId);
        }

        [HttpPost("course")]
        public async Task AddCourse(Course course,long userId)
        {
            //TODO: Check is user admin

            await _courseRepository.AddCourseAsync(course);
        }

        [HttpPut("course")]
        public async Task UpdateCourse(Course course, long userId)
        {
            //TODO: Check is user admin

            await _courseRepository.UpdateCourseAsync(course);
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

        [HttpPost("startCourse")]
        public async Task<IActionResult> StartCourse(long courseId, long userId)
        {
            await _courseRepository.RegisterInCourseAsync(userId, courseId);

            return Ok();
        }
    }
}
