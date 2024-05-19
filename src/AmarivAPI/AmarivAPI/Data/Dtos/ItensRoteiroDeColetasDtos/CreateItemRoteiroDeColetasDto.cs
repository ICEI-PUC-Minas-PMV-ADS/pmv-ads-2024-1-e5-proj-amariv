﻿using System.Collections;

namespace AmarivAPI.Data.Dtos.ItensRoteiroDeColetasDtos
{
    public class CreateItemRoteiroDeColetaDto
    {

        public int Id { get; set; }
        public int Id_Coletas { get; set; }
        public int PosicaoLista { get; set; }
    }
}