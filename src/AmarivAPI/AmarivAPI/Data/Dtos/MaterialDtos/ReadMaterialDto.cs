
﻿using System.ComponentModel.DataAnnotations;

namespace AmarivAPI.Data.Dtos.MaterialDtos
{
    public class ReadMaterialDto
    {
        public int Id { get; set; }

        public string Descricao { get; set; }

        public string Tipo { get; set; }

        public DateTime Data_criacao { get; set; }

        public string Peso { get; set; }

    }
}