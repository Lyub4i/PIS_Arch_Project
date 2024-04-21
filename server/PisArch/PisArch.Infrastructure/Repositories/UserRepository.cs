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
    public class UserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateNewUserAsync(User? user)
        {
            await _context.Users.AddAsync(user);
            await SaveChangesAsync();
        }

        public async Task AddNewToken(UserToken userToken)
        {
            await _context.UserTokens.AddAsync(userToken);
        }

        public async Task<User?> GetByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Username.Equals(username));
        }

        public async Task<User?> GetById(long id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task LogoutAsync(long userId)
        {
            var userTokens = _context.UserTokens.Where(x => x.UserId == userId).ToList();
            _context.UserTokens.RemoveRange(userTokens);

            await SaveChangesAsync();
        }

        public async Task UserPromocodeAsyn(long userId, string promo)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                return;
            }

            switch (promo)
            {
                case "ЗСУ":
                    user.Role = UserRoles.UBD;
                    break;
                case "FIT":
                    user.Role = UserRoles.Student;
                    break;
            }

            _context.Users.Update(user);
            await SaveChangesAsync();
        }

        private async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
