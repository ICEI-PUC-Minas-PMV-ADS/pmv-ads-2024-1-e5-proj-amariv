
﻿using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace AmarivAPI.Data.Dtos.MaterialDtos
{
    public class CreateMaterialDto
    {
          
        public string Descricao { get; set; }

        public string Tipo { get; set; }

        public string Peso { get; set; }


    }
}