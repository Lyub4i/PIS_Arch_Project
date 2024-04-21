using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PisArch.Domain.Enums;

namespace PisArch.Domain.Models
{
    public class Course : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string ImageLink { get; set; }
        public float Price { get; set; }
        public CourseTypes CourseType { get; set; }

        public ICollection<Lesson> Lessons { get; set; }
        public ICollection<UserProgresses> UserProgresses { get; set; }
    }
}
