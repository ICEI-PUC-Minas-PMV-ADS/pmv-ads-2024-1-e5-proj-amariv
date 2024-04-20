namespace AmarivAPI.Models
{
    public class AgendamentoDeColeta
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } /* Accepted, Rejected */
        public double Lat { get; set; }
        public double Lon { get; set; }
        public DateTime DataDeColeta { get; set; }
        public ICollection<ColetaItem> ColetaItems { get; set; }
    }
}
