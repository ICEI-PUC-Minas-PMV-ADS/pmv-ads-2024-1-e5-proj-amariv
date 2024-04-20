namespace AmarivAPI.Models
{
    public class Notificacao
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Titulo { get; set; }
        public string Corpo { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
