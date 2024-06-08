
﻿using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.EnderecoDto;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Data.Dtos.UsuarioDtos;
using AmarivAPI.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnderecoController : Controller
    {


        private EnderecoService _enderecoService;

        public EnderecoController(EnderecoService enderecoService)
        {
            _enderecoService = enderecoService;
        }

        [HttpGet("/enderecosusuario")]
        [Authorize]
        public IActionResult RecuperaEnderecosUsuario()
        {
            string userId = User.FindFirst("id").Value;
            List<ReadEnderecoDto> enderecos = _enderecoService.RecuperaEnderecosUsuario(userId);
            return Ok(enderecos);
        }

        [HttpGet]
        [Route("/RecuperaEndereco")]
        public IActionResult RecuperaEndereco( int id)
        {         
            var result = _enderecoService.RecuperaEndereco(id);
            if (result != null)
                return Ok(result);
            else
                return NotFound();
        }
  
       
        [HttpPost]
        [Route("/SalvarEndereco")]
        public IActionResult SalvarEndereco([FromBody] CreateEnderecoDto enderecoDto)
        {
            var  result = _enderecoService.SalvarEndereco(enderecoDto);

            if (result.IsFailed)
                return StatusCode(500);
            else
                return Ok(result);
        }

        [HttpPost]
        [Route("/UpdateEndereco")]
        public IActionResult UpdateMaterial([FromBody] UpdateEnderecoDto enderecoDto, int id)
        {
            var result = _enderecoService.UpdateEndereco(enderecoDto, id);

            if (result.IsFailed)
                return StatusCode(500);
            else
                return Ok(result);
        }
     


    }
}