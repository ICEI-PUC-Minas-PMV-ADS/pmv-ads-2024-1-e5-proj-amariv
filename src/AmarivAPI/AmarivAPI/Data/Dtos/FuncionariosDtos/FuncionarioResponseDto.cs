namespace AmarivAPI.DTOs.FuncionarioDtos
{
    public class FuncionarioResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Matricula { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public string Sexo { get; set; }
        public DateTime DataAdmissao { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Telefone { get; set; }
        public string Cargo { get; set; }
        public bool SuportaPeso { get; set; }
    }
}