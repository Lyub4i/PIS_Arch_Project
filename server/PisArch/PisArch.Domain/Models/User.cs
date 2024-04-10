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
        public string Email { get; set; } = string.Empty;

        public ICollection<UserToken> Tokens { get; set; } = new List<UserToken>();
        public ICollection<UserProgresses> UserProgresses { get; set; } = new List<UserProgresses>();
    }
}
