using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmarivAPI.Models
{
    public class RoteiroDeColetas
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string FuncionarioId { get; set; }
        [Required]
        public DateTime DataRoteiro { get; set; } // Data em que o roteiro sera executado.
        public DateTime DataCadastro { get; set; } = DateTime.Now;
        [Required]
        public Boolean Status { get; set; }
        [Required]
        public Boolean Delete { get; set; }
        public int NumeroDeColetas { get; set; }
        public int NumeroMaxColetas { get; set; }
        

    }
}