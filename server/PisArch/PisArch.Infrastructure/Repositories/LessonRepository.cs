using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PisArch.Domain.Models;

namespace PisArch.Infrastructure.Repositories
{
    public class LessonRepository
    {
        private readonly ApplicationDbContext _context;

        public LessonRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Lesson>> GetLessons(long courseId)
        {
            var course = await _context.Courses.Include(x => x.Lessons).FirstOrDefaultAsync(x => x.Id == courseId);

            if (course == null)
            {
                return new List<Lesson>();
            }

            var lessons = course.Lessons;
            foreach (var lesson in lessons)
            {
                lesson.Course = null;
                lesson.Materials = null;
            }

            return lessons;
        }

        public async Task<Lesson> GetLessonInfo(long lessonId)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(x => x.Id == lessonId);

            if (lesson == null)
            {
                return new Lesson();
            }

            return lesson;
        }

        public async Task<Lesson> GetTrailer(long courseId)
        {
            var course = await _context.Courses.Include(t => t.Lessons).ThenInclude(r => r.Materials).FirstOrDefaultAsync(x => x.Id == courseId);

            return course.Lessons.First();
        }

        public async Task<Lesson> GetCurrentLesson(long courseId, long userId)
        {
            var userProgresses =
                await _context.UserProgresses.Include(t => t.Course).ThenInclude(p => p.Lessons).ThenInclude(k => k.Materials).FirstOrDefaultAsync(x => x.CourseId == courseId && x.UserId == userId);

            if (userProgresses == null)
            {
                return new Lesson();
            }

            var lessons = userProgresses.Course.Lessons.ToList();

            if (lessons.Any())
            {
                var lesson = lessons[(int)(userProgresses.CurrentLesson - 1)];
                lesson.Course = null;
                foreach (var material in lesson.Materials)
                {
                    material.Lesson = null;
                }

                return lesson;
            }

            return new Lesson();
        }

        public async Task<bool> GoToTheNextLesson(long courseId, long userId)
        {
            var userProgress =
                await _context.UserProgresses.FirstOrDefaultAsync(x => x.CourseId == courseId && x.UserId == userId);

            if (userProgress == null)
            {
                return false;
            }

            if (userProgress.CurrentLesson == userProgress.LastLesson)
            {
                return false;
            }
            else
            {
                userProgress.CurrentLesson++;
                _context.UserProgresses.Update(userProgress);
                await _context.SaveChangesAsync();
            }

            return true;
        }

        public async Task AddLessonAsync(long courseId, Lesson lesson)
        {
            var course = await _context.Courses.Include(t => t.Lessons).Include(p => p.UserProgresses).FirstOrDefaultAsync(x => x.Id == courseId);
            if (course == null)
            {
                return;
            }

            course.Lessons.Add(lesson);
            foreach (var userProgress in course.UserProgresses)
            {
                userProgress.LastLesson = course.Lessons.Count;
            }

            _context.Courses.Update(course);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLessonAsync(long courseId, Lesson lesson)
        {
            var course = await _context.Courses.Include(t => t.Lessons).Include(p => p.UserProgresses).FirstOrDefaultAsync(x => x.Id == courseId);
            if (course == null)
            {
                return;
            }

            var cLesson = await _context.Lessons.FirstOrDefaultAsync(x => x.Id == lesson.Id);
            if (cLesson == null)
            {
                return;
            }

            cLesson.Content = lesson.Content;
            cLesson.Title = lesson.Title;
            cLesson.Description = lesson.Description;

            _context.Lessons.Update(cLesson);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLesson(long lessonId)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(x => x.Id == lessonId);
            _context.Lessons.Remove(lesson);

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Material>> GetMaterials(long lessonId)
        {
            var lesson = await _context.Lessons.Include(t => t.Materials).FirstOrDefaultAsync(x => x.Id == lessonId);
            if (lesson == null)
            {
                return new List<Material>()
                {
                    new Material()
                };
            }

            var materials = lesson.Materials;
            foreach (var material in materials)
            {
                material.Lesson = null;
            }

            return materials;
        }

        public async Task AddMaterialAsync(long lessonId, Material material)
        {
            var lesson = await _context.Lessons.Include(t => t.Materials).FirstOrDefaultAsync(x => x.Id == lessonId);
            if (lesson == null)
            {
                return;
            }
            
            lesson.Materials.Add(material);
            _context.Lessons.Update(lesson);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateMaterial(long materialId, Material material)
        {
            var cmaterial = await _context.Materials.FirstOrDefaultAsync(x => x.Id == materialId);
            if (cmaterial == null)
            {
                return;
            }

            cmaterial.Description = material.Description;
            cmaterial.FileType = material.FileType;
            cmaterial.Link = material.Link;

            _context.Materials.Update(cmaterial);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteMaterial(long materialId)
        {
            var cmaterial = await _context.Materials.FirstOrDefaultAsync(x => x.Id == materialId);

            _context.Materials.Remove(cmaterial);

            await _context.SaveChangesAsync();
        }

        public async Task<Material> GetMatrialInfo(long materialId)
        {
            var cmaterial = await _context.Materials.FirstOrDefaultAsync(x => x.Id == materialId);

            return cmaterial;
        }
    }
}
