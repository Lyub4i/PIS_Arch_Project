﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PisArch.Domain.Enums;

namespace PisArch.Domain.Models
{
    public class Material : IEntity
    {
        public long Id { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        public FileTypes FileType { get; set; }

        public Lesson Lesson { get; set; }
        public long LessonId { get; set; }
    }
}
