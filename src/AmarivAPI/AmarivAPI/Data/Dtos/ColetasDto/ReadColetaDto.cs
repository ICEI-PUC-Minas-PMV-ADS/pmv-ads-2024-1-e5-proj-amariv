#nullable enable

using AmarivAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos.ColetasDto
{
    public class ReadColetaDto
    {
        public int ID { get; set; }
        public int? UserId { get; set; }
        public int? EnderecoId { get; set; }
        public int? RoteiroColetaId { get; set; }
        public int? PosicaoLista { get; set; }
        public string? ClienteNome { get; set; }
        public string? ClienteCel { get; set; }
        public string? ClienteTel { get; set; }
        public bool Status { get; set; }
        public bool Delete { get; set; }
        public double? Lat { get; set; }
        public double? Lon { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime DataDeColeta { get; set; }
        public string? ListaItensColeta { get; set; }

    }
}