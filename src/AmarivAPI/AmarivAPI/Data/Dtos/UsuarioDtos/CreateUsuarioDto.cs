﻿using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos.UsuarioDtos
{
    public class CreateUsuarioDto
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        public string RePassword { get; set; }
        [Required]
        public string Celular { get; set; }
    }
}
