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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            Usuario admin = new Usuario
            {
                Id = "adm",
                Nome = "Administrador",
                UserName = "amarivadm@gmail.com",
                NormalizedUserName = "AMARIVADM@GMAIL.COM",
                Email = "amarivadm@gmail.com",
                NormalizedEmail = "AMARIVADM@GMAIL.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            PasswordHasher<IdentityUser> hasher = new PasswordHasher<IdentityUser>();
            admin.PasswordHash = hasher.HashPassword(admin, "Admin123!");

            builder.Entity<Usuario>().HasData(admin);
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "adm", Name = "admin", NormalizedName = "ADMIN"});
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "fun", Name = "funcionario", NormalizedName = "FUNCIONARIO" });
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "clt", Name = "cliente", NormalizedName = "CLIENTE" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "adm", UserId = "adm" });
        }
        public DbSet<Coleta> Coletas { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Material> Materiais { get; set; }
        public DbSet<RoteiroDeColetas> RoteiroDeColetas { get; set; }
        public DbSet<ItemRoteiroDeColeta> ItensRoteiroDeColetas { get; set; }
    }
}
