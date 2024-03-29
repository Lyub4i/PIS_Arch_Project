using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PisArch.Domain.Models;

namespace PisArch.Application.Repositories.Interfaces
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetCourses();
    }
}
