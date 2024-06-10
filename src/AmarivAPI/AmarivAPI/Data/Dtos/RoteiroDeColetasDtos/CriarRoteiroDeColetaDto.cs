namespace AmarivAPI.Data.Dtos.RoteiroDeColetasDtos
{
    public class CriarRoteiroDeColetaDto
    {
        public string FuncionarioId { get; set; }
        public int MaxNumColeta { get; set; }
        public DateTime DataRoteiro { get; set; }
    }
}
