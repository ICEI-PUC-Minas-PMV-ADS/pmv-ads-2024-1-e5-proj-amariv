using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.DTOs.FuncionarioDtos
{
    public class FuncionarioUpdateDto
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        public string Email { get; set; }

        public string Sexo { get; set; }

        public bool SuportaPeso { get; set; }

        public string Senha { get; set; }

        public string Cargo { get; set; }

        public string Telefone { get; set; }
    }
}