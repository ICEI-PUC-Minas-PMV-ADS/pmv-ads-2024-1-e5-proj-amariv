using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Requests
{
    public class SolicitaConfirmacaoRequest
    {
        [Required] 
        public string Email { get; set; }
    }
}
