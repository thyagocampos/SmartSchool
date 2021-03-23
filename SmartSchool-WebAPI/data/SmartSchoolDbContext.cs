using Microsoft.EntityFrameworkCore;
using SmartSchool_WebAPI.models;

namespace SmartSchool_WebAPI.data
{
    public class SmartSchoolDbContext : DbContext
    {
        public DbSet<Professor> Blogs { get; set; }
        public DbSet<Aluno> Posts { get; set; }
    }
}