using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace AmarivAPI.Data.Dtos.MaterialDtos
{
    public class CreateMaterialDto
    {
        public string? Descricao { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        public string Tipo { get; set; }

        public string Peso { get; set; }
    }
}
