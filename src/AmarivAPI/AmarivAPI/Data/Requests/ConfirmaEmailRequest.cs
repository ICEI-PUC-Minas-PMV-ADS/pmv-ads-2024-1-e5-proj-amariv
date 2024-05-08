using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Requests
{
    public class ConfirmaEmailRequest
    {
        [Required]
        public string UsuarioId { get; set; }
        [Required]
        public string CodigoAtivacao { get; set; }
    }
}
