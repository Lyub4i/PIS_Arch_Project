using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PisArch.Domain.Models
{
    public class UserProgresses : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public float Progress { get; set; }
        public long CurrentLesson { get; set; }
        public DateTime CompletionDate { get; set; }
        public DateTime StartedDate { get; set; }

        public User User { get; set; }
        public long UserId { get; set; }
        public Course Course { get; set; }
        public long CourseId { get; set; }
    }
}
