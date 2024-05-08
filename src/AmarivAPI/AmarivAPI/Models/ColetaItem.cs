using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmarivAPI.Models
{
    public class ColetaItem
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int ColetaId { get; set; }
        public int MaterialId { get; set; }
        public String Peso { get; set; }
    }
}
