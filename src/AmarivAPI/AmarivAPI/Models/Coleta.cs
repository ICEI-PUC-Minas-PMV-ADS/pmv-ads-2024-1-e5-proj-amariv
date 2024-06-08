#nullable enable

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
        public string? UserId { get; set; } = null;    
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
        public bool Status { get; set; } = true;      // Define se a coleta esta em aberto.
        [Required]
        public bool IsSuccess { get; set; } = false;   // Define se a coleta ou feita ou se foi cancelada.
        [Required]
        public bool Delete { get; set; } = false;
        public bool Cancelada { get; set; } = false; /* sim, não*/
        [AllowNull]
        public double? Lat { get; set; }
        [AllowNull]
        public double? Lon { get; set; }
        /// <summary>
        ///  Define se a localidade passado por latitude e longitude é exata ou aproximada.
        /// </summary>
        [AllowNull]
        public bool? LocalidadeExata {get; set;} 
        [Required]
        public DateTime DataCadastro { get; set; } = DateTime.Now;
        [Required]
        public DateTime DataDeColeta { get; set; }
        /// <summary>
        /// O campo ListaItensColeta será do tipo TEXT no banco de dados para comportar os materiais que
        /// irão ser adicionados na coleta. EXEMPLO DA LISTA (ID (MATERIAL):PESO): "1:leve;2:pesado; etc... "      
        /// </summary>
        public string? ListaItensColeta { get; set; } // "1:Leve;2:Pesado"

        [ForeignKey("UserId")]
        public virtual Usuario? Usuario { get; set; }
        [ForeignKey("EnderecoId")]
        public virtual Endereco? Endereco { get; set; }
        [ForeignKey("RoteiroColetaId")]
        public virtual RoteiroDeColetas? RoteiroDeColetas { get; set; }
    }
}
