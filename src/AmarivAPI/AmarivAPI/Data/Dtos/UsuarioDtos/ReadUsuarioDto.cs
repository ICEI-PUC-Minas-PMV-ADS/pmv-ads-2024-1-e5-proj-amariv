namespace AmarivAPI.Data.Dtos.UsuarioDtos
{
    public class ReadUsuarioDto
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string Celular { get; set; }
        public string? Telefone { get; set; }
        public bool EmailConfirmed { get; set; }
        public string Email { get; set; }
    }
}
