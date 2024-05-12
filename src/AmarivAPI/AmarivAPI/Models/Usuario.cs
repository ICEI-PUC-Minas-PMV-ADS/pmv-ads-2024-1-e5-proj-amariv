using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Models
{
    public class Usuario: IdentityUser
    {   
        public Usuario() : base()
        { }

        public string Nome { get; set; }
    }
}
