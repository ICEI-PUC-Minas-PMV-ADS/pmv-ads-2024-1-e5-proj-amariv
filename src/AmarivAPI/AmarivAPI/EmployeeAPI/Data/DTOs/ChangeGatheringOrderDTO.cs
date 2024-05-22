using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AmarivAPI.EmployeeAPI.Data.DTOs
{
    public class ChangeGatheringOrderDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public ICollection<Dictionary<string, int>> RouteIdMap { get; set; }
    }
}
