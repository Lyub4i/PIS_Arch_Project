using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PisArch.Domain.Constants;
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

        public async Task DeleteCourse(long userId, long courseId)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(x => x.Id == courseId);
            if (course == null)
            {
                return;
            }
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
        }

        public async Task AddCourseAsync(Course course)
        {
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCourseAsync(Course course)
        {
            if (_context.Courses.Contains(course))
            {
                _context.Courses.Update(course);

                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Course>> GetMyCourses(long userId)
        {
            var userProgress = await _context.UserProgresses.Where(x => x.UserId == userId).Include(t => t.Course).ToListAsync();

            if (userProgress == null || !userProgress.Any())
            {
                return null;
            }

            var courses = userProgress.Select(x => x.Course).ToList();
            foreach (var course in courses)
            {
                course.UserProgresses = null;
            }

            return courses;
        }

        public async Task RegisterInCourseAsync(long userId, long courseId)
        {
            var course = await _context.Courses.Include(t => t.Lessons).FirstOrDefaultAsync(x => x.Id == courseId);

            var started =
                await _context.UserProgresses.FirstOrDefaultAsync(x => x.CourseId == courseId && x.UserId == userId);

            if (started != null)
            {
                return;
            }

            var userProgres = new UserProgresses()
            {
                CurrentLesson = 1,
                LastLesson = course.Lessons.Count,
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
