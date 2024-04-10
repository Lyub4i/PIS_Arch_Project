using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PisArch.Domain.Models
{
    public class UserToken : IEntity
    {
        public long Id { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpTime { get; set; }

        public User User { get; set; }
        public long UserId { get; set; }
    }
}
