using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Requests
{
    public class SolicitaRecuperacaoRequest
    {
        [Required] 
        public string Email { get; set; }
    }
}
