using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PisArch.Domain.Models
{
    public class Lesson : IEntity
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }

        public ICollection<Material> Materials { get; set; }
        public Course Course { get; set; }
        public long CourseId { get; set; }
    }
}
