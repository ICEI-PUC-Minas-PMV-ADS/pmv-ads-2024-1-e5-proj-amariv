
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmarivAPI.Models
{
    public class ItemRoteiroDeColeta
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public int Id_RoreiroDeColetas { get; set; }
        public int Id_Coletas { get; set; }
        public int PosicaoLista { get; set; }
        public string Endereco { get; set; }
        public string Materiais { get; set; }
        [NotMapped]
        public virtual bool IsActive { get; set; }
        [NotMapped]
        public virtual ItemRoteiroDeColetaPos GeoLocation {  get; set; }
        public bool IsDelete { get; } = false;
    }

    [Keyless]
    public class ItemRoteiroDeColetaPos
    {
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}