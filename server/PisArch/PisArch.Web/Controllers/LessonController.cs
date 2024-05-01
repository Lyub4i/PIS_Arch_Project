using Microsoft.AspNetCore.Mvc;
using PisArch.Domain.Models;
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

        [HttpGet("lessons")]
        public async Task<IActionResult> GetLessons(long courseId)
        {
            var result = await _lessonRepository.GetLessons(courseId);
            return Ok(result);
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

        [HttpPost("lesson")]
        public async Task<IActionResult> AddLesson(long courseId, long userId, Lesson lesson)
        {
            await _lessonRepository.AddLessonAsync(courseId, lesson);
            return Ok();
        }

        [HttpPut("lesson")]
        public async Task<IActionResult> UpdateLesson(long courseId, long userId, Lesson lesson)
        {
            await _lessonRepository.UpdateLessonAsync(courseId, lesson);
            return Ok();
        }

        [HttpDelete("lesson")]
        public async Task<IActionResult> DeleteLessonAsync(long lessondId)
        {
            await _lessonRepository.DeleteLesson(lessondId);

            return Ok();
        }

        [HttpGet("lessonInfo")]
        public async Task<IActionResult> GetLessonInfo(long lessonId)
        {
            return Ok(await _lessonRepository.GetLessonInfo(lessonId));
        }

        //Materials

        [HttpGet("materials")]
        public async Task<IActionResult> GetMaterials(long lessonId)
        {
            return Ok(await _lessonRepository.GetMaterials(lessonId));
        }

        [HttpPost("material")]
        public async Task<IActionResult> AddMaterial(long lessonId, Material material)
        {
            await _lessonRepository.AddMaterialAsync(lessonId, material);
            return Ok();
        }

        [HttpPut("material")]
        public async Task<IActionResult> UpdateMaterial(long materialId, Material material)
        {
            await _lessonRepository.UpdateMaterial(materialId, material);
            return Ok();
        }

        [HttpDelete("material")]
        public async Task<IActionResult> UpdateMaterial(long materialId)
        {
            await _lessonRepository.DeleteMaterial(materialId);
            return Ok();
        }

        [HttpGet("materialInfo")]
        public async Task<IActionResult> GetMaterialInfo(long materialId)
        {
            return Ok(await _lessonRepository.GetMatrialInfo(materialId));
        }
    }
}
