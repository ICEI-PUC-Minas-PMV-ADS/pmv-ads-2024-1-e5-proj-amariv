using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace AmarivAPI.Models
{
    public class Material
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(250)]
        public string? Descricao { get; set; }

        [AllowNull]
        public string Tipo { get; set; }

        public bool Delete { get; set; } = false;

        public DateTime Data_criacao { get; set; }
    }
}
