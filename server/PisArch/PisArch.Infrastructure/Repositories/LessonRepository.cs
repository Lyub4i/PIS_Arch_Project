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

        public async Task GetCurrentLesson()
        {

        }

        public async Task<Lesson> GetTrailer(long courseId)
        {
            var course = await _context.Courses.Include(t => t.Lessons).ThenInclude(r => r.Materials).FirstOrDefaultAsync(x => x.Id == courseId);

            return course.Lessons.First();
        }
    }
}
