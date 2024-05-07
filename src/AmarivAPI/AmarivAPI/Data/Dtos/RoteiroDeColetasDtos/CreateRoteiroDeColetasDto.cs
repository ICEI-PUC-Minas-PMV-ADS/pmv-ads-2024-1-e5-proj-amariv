using AmarivAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos.RoteiroDeColetasDtos
{
    public class CreateRoteiroDeColetasDto
    {

        public DateTime DataCadastro { get; set; }      
        public bool Status { get; set; }      
        public bool Delete { get; set; }
        public int NumeroDeColetas { get; set; }
        public int NumeroMaxColetas { get; set; }



    }
}