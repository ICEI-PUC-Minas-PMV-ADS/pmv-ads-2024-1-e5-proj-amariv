﻿#nullable enable

using AmarivAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmarivAPI.Data.Dtos.ColetasDto
{
    public class ReadColetaDto
    {
        public int ID { get; set; }
        public string? UserId { get; set; }
        public int? EnderecoId { get; set; }
        public int? RoteiroColetaId { get; set; }
        public int? PosicaoLista { get; set; }
        public bool IsSuccess { get; set; }
        public bool AprovacaoAdmin { get; set; }
        public string? ClienteNome { get; set; }
        public string? ClienteCel { get; set; }
        public string? ClienteTel { get; set; }
        public bool Status { get; set; }
        public bool Delete { get; set; }
        public bool Cancelada { get; set; }
        public double? Lat { get; set; }
        public double? Lon { get; set; }
        public bool? LocalidadeExata { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime DataDeColeta { get; set; }
        public string? ListaItensColeta { get; set; }
        public virtual Usuario? Usuario { get; set; }
        public virtual Endereco? Endereco { get; set; }
    }
}