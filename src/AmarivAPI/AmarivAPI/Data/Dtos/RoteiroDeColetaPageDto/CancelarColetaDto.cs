﻿namespace AmarivAPI.Data.Dtos.RoteiroDeColetaPageDto
{
    public class CancelarColetaDto
    {
        public int ColetaId { get; set; }
        public int RoteiroDeColetaId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
