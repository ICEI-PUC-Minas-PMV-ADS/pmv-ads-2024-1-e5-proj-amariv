using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos.RoteiroDeColetasDtos
{
    public class OrdenaRoteiroDeColetasDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public ICollection<Dictionary<string, int>> RouteIdMap { get; set; }
    }
}
