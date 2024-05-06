using System;
using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.DTOs.FuncionarioDtos
{
    public class FuncionarioUpdateDto
    {
        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        public string Matricula { get; set; }

        public string Email { get; set; }

        [Required(ErrorMessage = "O campo CPF é obrigatório.")]
        public string Cpf { get; set; }

        public string Sexo { get; set; }

        public DateTime DataAdmissao { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Telefone { get; set; }

        public string Cargo { get; set; }

        [Required(ErrorMessage = "O campo Senha é obrigatório.")]
        public string Senha { get; set; }

        public bool SuportaPeso { get; set; }
    }
}