﻿using Microsoft.AspNetCore.Identity;

namespace AmarivAPI.Models
{
    public class Usuario: IdentityUser
    {   
        public Usuario() : base()
        { }

        public string Nome { get; set; }
        public string Celular { get; set; } = string.Empty;
    }
}
