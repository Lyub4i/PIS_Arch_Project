using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PisArch.Domain.Models;

namespace PisArch.Infrastructure.Repositories
{
    public class CourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IsUserStudy(long userId, long courseId)
        {
            var userProgress = await _context.UserProgresses.Where(x => x.UserId == userId).ToListAsync();

            if (userProgress == null || !userProgress.Any())
            {
                return false;
            }

            return userProgress.FirstOrDefault(x => x.CourseId == courseId) != null;
        }

        public async Task<Course> GetCourse(long courseId)
        {
            return await _context.Courses.FirstOrDefaultAsync(x => x.Id == courseId);
        }

        public async Task<IEnumerable<Course>> GetCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<IEnumerable<Course>> GetMyCourses(long userId)
        {
            var userProgress = await _context.UserProgresses.Where(x => x.UserId == userId).Include(t => t.Course).ToListAsync();

            if (userProgress == null || !userProgress.Any())
            {
                return null;
            }

            return userProgress.Select(x => x.Course);
        }

        public async Task RegisterInCourseAsync(long userId, long courseId)
        {
            var course = await _context.Courses.Include(t => t.Lessons).FirstOrDefaultAsync(x => x.Id == courseId);

            var userProgres = new UserProgresses()
            {
                CurrentLesson = 1,
                StartedDate = DateTime.UtcNow,
                UserId = userId,
                CourseId = courseId,
                CompletionDate = DateTime.UtcNow.AddDays(7*(course.Lessons.Count/2))
            };

            await _context.UserProgresses.AddAsync(userProgres);
            await _context.SaveChangesAsync();
        }
    }
}
