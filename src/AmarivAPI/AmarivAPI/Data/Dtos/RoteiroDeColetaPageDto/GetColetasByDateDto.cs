namespace AmarivAPI.Data.Dtos.RoteiroDeColetaPageDto
{
    public class GetColetasByDateDto
    {
        public int RoteiroDeColetaId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
