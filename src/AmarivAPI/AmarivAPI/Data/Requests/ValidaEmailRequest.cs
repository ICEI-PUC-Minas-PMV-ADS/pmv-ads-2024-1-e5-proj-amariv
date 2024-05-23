using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Requests
{
    public class ValidaEmailRequest
    {
        [Required]
        public string Email { get; set; }   
    }
}
