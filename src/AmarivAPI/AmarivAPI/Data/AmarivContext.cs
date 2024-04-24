using AmarivAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AmarivAPI.Data
{
    public class AmarivContext : IdentityDbContext<Usuario>
    {
        public AmarivContext(DbContextOptions<AmarivContext> opts) : base(opts)
        {

        }
        public DbSet<Material> Materiais { get; set; }
        public DbSet<RoteiroDeColetas> RoteiroDeColetas { get; set; }
        public DbSet<ItemRoteiroDeColeta> ItensRoteiroDeColetas { get; set; }
    }

}
