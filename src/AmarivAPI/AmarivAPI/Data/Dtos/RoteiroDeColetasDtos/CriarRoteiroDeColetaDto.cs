namespace AmarivAPI.Data.Dtos.RoteiroDeColetasDtos
{
    public class CriarRoteiroDeColetaDto
    {
        public string FuncionarioId { get; set; }
        public int MaxNumColeta { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
