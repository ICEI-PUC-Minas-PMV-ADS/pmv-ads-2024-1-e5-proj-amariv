using System;
using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Models
{
    public class Funcionario
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        public string Matricula { get; set; }

        public string Email { get; set; }

        [Required(ErrorMessage = "O campo CPF é obrigatório.")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "O campo Sexo é obrigatório.")]
        public string Sexo { get; set; }

        [Required(ErrorMessage = "O campo Data de Admissão é obrigatório.")]
        public DateTime DataAdmissao { get; set; }

        [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório.")]
        public DateTime DataNascimento { get; set; }

        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo Cargo é obrigatório.")]
        public string Cargo { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        public string Senha { get; set; }

        public bool SuportaPeso { get; set; }
    }
}