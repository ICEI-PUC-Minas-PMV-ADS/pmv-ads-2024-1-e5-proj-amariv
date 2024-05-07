using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace AmarivAPI.Models
{
    public class Endereco
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [AllowNull]
        public string? Logradouro { get; set; }
        [AllowNull]
        public string? Numero { get; set; }
        [AllowNull]
        public string? Bairro { get; set; }
        [AllowNull]
        public string? Cep { get; set; }
        [AllowNull]
        public string? Cidade { get; set; }
        [AllowNull]
        public string? Referencia { get; set; }


    }
}
