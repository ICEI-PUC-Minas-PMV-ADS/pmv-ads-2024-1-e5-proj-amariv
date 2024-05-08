using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmarivAPI.Models
{
    public class Coleta
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } /* Pendent, Completed, Canceled */
        public double Lat { get; set; }
        public double Lon { get; set; }
        public DateTime DataDeColeta { get; set; }
        public ICollection<ColetaItem> ColetaItems { get; set; }
    }
}
