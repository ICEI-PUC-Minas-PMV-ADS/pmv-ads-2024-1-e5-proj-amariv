using AmarivAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos.RoteiroDeColetasDtos
{
    public class ReadRoteiroDeColetasDto
    {

        public int? Id { get; set; }    
        public string? FuncionarioId { get; set; }       
        public DateTime? DataRoteiro { get; set; } 
        public DateTime? DataCadastro { get; set; }    
        public Boolean Status { get; set; }
        public Boolean Delete { get; set; }
        public int? NumeroDeColetas { get; set; }
        public int? NumeroMaxColetas { get; set; }
        public Usuario? funcionario { get; set; }
    }
}