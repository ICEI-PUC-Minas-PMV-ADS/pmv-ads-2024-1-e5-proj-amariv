using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Requests
{
    public class RecuperaSenhaRequest
    {
        [Required]
        public string CodigoRecuperacao { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string RePassword { get; set; }
    }
}
