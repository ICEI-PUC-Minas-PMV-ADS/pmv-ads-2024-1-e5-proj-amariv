namespace AmarivAPI.Models
{
    public class AgendamentoDeColetaItem
    {
        public int Id { get; set; }
        public int ColetaId { get; set; }
        public int MaterialId { get; set; }
        public String Peso { get; set; }
    }
}
