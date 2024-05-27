using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Requests
{
    public class EnderecosRequest
    {
        [Required]
        public string UsuarioId { get; set; }
    }
}
