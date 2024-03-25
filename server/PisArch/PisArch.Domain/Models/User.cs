using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PisArch.Domain.Models
{
    public class User : IEntity
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }

        public ICollection<UserTokens> Tokens { get; set; }
        public ICollection<UserProgresses> UserProgresses { get; set; }
    }
}
