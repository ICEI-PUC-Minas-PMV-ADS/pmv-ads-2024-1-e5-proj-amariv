using AmarivAPI.Data.Dtos.ColetasDto;

namespace AmarivAPI.Data.Dtos.RoteiroDeColetasDtos
{
    public class AddRouteToRoteiroDeColetaDto
    {
        public int RoteiroDeColetaId { get; set; }
        public int ColetaId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
