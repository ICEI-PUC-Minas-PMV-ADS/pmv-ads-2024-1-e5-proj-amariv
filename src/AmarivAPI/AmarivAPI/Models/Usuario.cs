#nullable enable

using Microsoft.AspNetCore.Identity;

namespace AmarivAPI.Models
{
    public class Usuario: IdentityUser
    {   
        public Usuario() : base()
        { }

        public string Nome { get; set; }
        public string? Celular { get; set; }
        public string? Telefone { get; set; }

        public string? Sexo { get; set; }

        public bool? SuportaPeso { get; set; }

        public string? Cargo { get; set; }
    }
}
