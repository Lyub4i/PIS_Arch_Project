﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
            user.Id = GenerateNewUserId();
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

        private long GenerateNewUserId()
        {
            var maxId = _context.Users.Max(u => (long?)u.Id) ?? 0;
            return maxId + 1;
        }

        private async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
