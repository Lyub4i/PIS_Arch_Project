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
    }
}
