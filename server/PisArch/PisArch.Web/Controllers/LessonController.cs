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

        [HttpGet("currentLesson")]
        public async Task<IActionResult> GetCurrentLesson(long userId, long courseId)
        {
            var result = await _lessonRepository.GetCurrentLesson(courseId, userId);
            return Ok(result);
        }

        [HttpPost("goToTheNext")]
        public async Task<IActionResult> GoToTheNextLesson(long courseId, long userId)
        {
            var result = await _lessonRepository.GoToTheNextLesson(courseId, userId);
            return Ok(result);
        }
    }
}
