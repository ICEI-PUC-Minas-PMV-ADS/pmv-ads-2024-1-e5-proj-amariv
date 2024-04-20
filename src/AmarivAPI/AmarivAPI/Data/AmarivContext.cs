using AmarivAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AmarivAPI.Data
{
    public class AmarivContext: IdentityDbContext<Usuario>
    {
        public AmarivContext(DbContextOptions<AmarivContext> opts): base(opts) 
        {
        }
    }
}
