using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Models
{
    public class Funcionario
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo Email é obrigatório.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo Sexo é obrigatório.")]
        public string Sexo { get; set; }

        public bool SuportaPeso { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "O campo Cargo é obrigatório.")]
        public string Cargo { get; set; }

        [Required(ErrorMessage = "O campo Telefone é obrigatório.")]
        public string Telefone { get; set; }
    }
}