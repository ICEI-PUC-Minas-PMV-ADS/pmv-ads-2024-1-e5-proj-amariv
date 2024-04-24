using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmarivAPI.Models
{
    public class Notificacao
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Titulo { get; set; }
        public string Corpo { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
