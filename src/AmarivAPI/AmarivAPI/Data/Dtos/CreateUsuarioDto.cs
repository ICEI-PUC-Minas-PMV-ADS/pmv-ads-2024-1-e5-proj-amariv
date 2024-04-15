using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos
{
    public class CreateUsuarioDto
    {
        [Required]
        [StringLength(20, ErrorMessage = "O nome deve ter no máximo 20 caracteres")]
        public string Nome { get; set; }
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
