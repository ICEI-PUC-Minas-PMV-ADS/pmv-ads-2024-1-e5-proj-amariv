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
        public DateTime DataRoteiro { get; set; } // 19/05/2024 - 23:59
        public DateTime DataCadastro { get; set; } = DateTime.Now;
        [Required]
        public Boolean Status { get; set; }
        [Required]
        public Boolean Delete { get; set; }
        public int NumeroDeColetas { get; set; }
        public int NumeroMaxColetas { get; set; }
        [ForeignKey("FuncionarioId")]
        public virtual Usuario Funcionario { get; set; }
        public virtual ICollection<Coleta> Coletas { get; set; } = new List<Coleta>();
    }
}