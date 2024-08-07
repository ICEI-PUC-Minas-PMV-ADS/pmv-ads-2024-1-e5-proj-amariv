﻿using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos.EnderecoDto
{
    public class ReadEnderecoDto
    {
        public int Id { get; set; }
        public string? Logradouro { get; set; }
        public string? Numero { get; set; }
        public string? Bairro { get; set; }
        public string? Cep { get; set; }
        public string? Cidade { get; set; }
        public string? Referencia { get; set; }
        public string? UserId { get; set; }

    }
}
