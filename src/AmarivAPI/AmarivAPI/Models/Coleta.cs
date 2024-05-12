using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace AmarivAPI.Models
{
    public class Coleta
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [AllowNull]
        public int? UserId { get; set; }
        [AllowNull]
        public int? EnderecoId { get; set; }
        [AllowNull]
        public int? RoteiroColetaId { get; set;}
        [AllowNull]
        public int? PosicaoLista {  get; set; }
        [AllowNull]
        public string? ClienteNome { get; set; }
        [AllowNull]
        public string? ClienteCel { get; set; }
        [AllowNull]
        public string? ClienteTel { get; set; }
        [Required]
        public bool Status { get; set; }  /* Pendent, Completed, Canceled */
        [Required]
        public bool Delete {  get; set; } 
        public bool AprovacaoAdmin {  get; set; } /* sim, não*/
        [AllowNull]
        public double? Lat { get; set; }
        [AllowNull]
        public double? Lon { get; set; }
        [Required]
        public DateTime DataCadastro { get; set; }
        [Required]
        public DateTime DataDeColeta { get; set; }
        /// <summary>
        /// O campo ListaItensColeta será do tipo TEXT no banco de dados para comportar os materiais que
        /// irão ser adicionados na coleta. EXEMPLO DA LISTA (ID:DESCRIÇÃO:PESO): "1:papel:leve,2:metal:pesado, etc... "      
        /// </summary>
        public string? ListaItensColeta { get; set; }

        [ForeignKey("UserId")]
        public virtual Usuario? Usuario { get; }
        [ForeignKey("EnderecoId")]
        public virtual Endereco Endereco { get; }
        [ForeignKey("RoteiroColetaId")]
        public virtual RoteiroDeColetas RoteiroDeColetas { get; }
    }
}
