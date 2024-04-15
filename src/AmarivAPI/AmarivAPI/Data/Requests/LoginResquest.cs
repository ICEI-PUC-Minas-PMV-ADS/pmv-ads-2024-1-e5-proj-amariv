using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Requests
{
    public class LoginResquest
    {
        [Required]
        public string Email { get; set; }
        [Required] 
        public string Password { get; set; }
    }
}
