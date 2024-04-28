
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

    }
}