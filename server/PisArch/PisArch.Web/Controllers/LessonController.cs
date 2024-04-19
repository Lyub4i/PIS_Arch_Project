using Microsoft.AspNetCore.Mvc;
using PisArch.Infrastructure.Repositories;

namespace PisArch.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly LessonRepository _lessonRepository;

        public LessonController(LessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        [HttpGet("getFirstLesson")]
        public async Task<IActionResult> GetTrailer(long courseId)
        {
            var lesson = await _lessonRepository.GetTrailer(courseId);

            lesson.Course = null;
            foreach (var material in lesson.Materials)
            {
                material.Lesson = null;
            }

            return Ok(lesson);
        }
    }
}
