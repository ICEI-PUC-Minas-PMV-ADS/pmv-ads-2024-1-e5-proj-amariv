namespace AmarivAPI.Data.Dtos.RoteiroDeColetasDtos
{
    public class SaveRoteiroDeColetaDto
    {
        public int RoteiroDeColetaId { get; set; }
        public string FuncionarioId { get; set; }
        public int MaxNumColeta { get; set; }
        public DateTime DataRoteiro { get; set; }
    }
}
