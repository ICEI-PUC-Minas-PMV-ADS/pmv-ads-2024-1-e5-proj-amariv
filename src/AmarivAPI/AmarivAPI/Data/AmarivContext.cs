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


            //Configurando usuario administrador
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


            //Configurando materiais iniciais
            Material metal = new Material
            {
                Data_criacao = new DateTime(),
                Id = 1,
                Descricao = "Metal",
                Tipo = "Metal"
        };
            Material plastico = new Material
            {
                Data_criacao = new DateTime(),
                Id = 2,
                Descricao = "Plástico",
                Tipo = "Plástico"
            };
            Material papel = new Material
            {
                Data_criacao = new DateTime(),
                Id = 3,
                Descricao = "Papel",
                Tipo = "Papel"
            };
            Material vidro = new Material
            {
                Data_criacao = new DateTime(),
                Id = 4,
                Descricao = "Vidro",
                Tipo = "Vidro"
            };

            builder.Entity<Usuario>().HasData(admin);
            builder.Entity<Material>().HasData(metal);
            builder.Entity<Material>().HasData(plastico);
            builder.Entity<Material>().HasData(papel);
            builder.Entity<Material>().HasData(vidro);
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "adm", Name = "admin", NormalizedName = "ADMIN"});
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "fun", Name = "funcionario", NormalizedName = "FUNCIONARIO" });
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "clt", Name = "cliente", NormalizedName = "CLIENTE" });
            builder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "adm", UserId = "adm" });

            //builder.Entity<RoteiroDeColetas>()
            //    .HasMany(e => e.Coletas)
            //    .WithOne(e => e.RoteiroDeColetas)
            //    .HasForeignKey(e => e.RoteiroColetaId);

            //builder.Entity<RoteiroDeColetas>()
            //    .HasOne(e => e.Funcionario)
            //    .WithOne()
            //    .HasForeignKey<RoteiroDeColetas>(e => e.FuncionarioId)
            //    .HasPrincipalKey<Usuario>(e => e.Id)
            //    .IsRequired(false);
               

            //builder.Entity<Coleta>()
            //    .HasOne(e => e.Usuario)
            //    .WithMany()
            //    .HasForeignKey(e => e.UserId)
            //    .HasPrincipalKey(e => e.Id);

            //builder.Entity<Coleta>()
            //    .HasOne(e => e.RoteiroDeColetas)
            //    .WithMany(e => e.Coletas)
            //    .HasForeignKey(e => e.RoteiroColetaId);

            //builder.Entity<Coleta>()
            //    .HasOne(e => e.Endereco)
            //    .WithOne()
            //    .HasForeignKey<Coleta>(e => e.EnderecoId)
            //    .HasPrincipalKey<Endereco>(e => e.Id);
        }
        public DbSet<Coleta> Coletas { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Material> Materiais { get; set; }
        public DbSet<RoteiroDeColetas> RoteiroDeColetas { get; set; }
    }
}
