using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos.RoteiroDeColetasDtos
{
    public class ReadRoteiroDeColetasDto
    {
        
        public int Id { get; set; }
        public DateTime DataCadastro { get; set; }       
        public bool Status { get; set; }      
        public bool Delete { get; set; }
        public int NumeroDeColetas { get; set; }
        public int NumeroMaxColetas { get; set; }


    }
}