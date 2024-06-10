
﻿using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MaterialController : Controller
    {


        private MaterialService _materialService;

        public MaterialController(MaterialService materialService)
        {
            _materialService = materialService;
        }

        [HttpGet]
        [Route("/RecuperaMaterial")]
        [Authorize(Roles = "admin")]
        public IActionResult RecuperaMaterial( int id)
        {         
            var result = _materialService.RecuperaMaterial(id);
            if (result != null)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpGet]
        [Route("/RecuperaMateriais")]
        [Authorize(Roles = "admin")]
        public IActionResult RecuperaMateriais()
        {
            var result = _materialService.RecuperarTodosMateriais();
            if (result != null)
                return Ok(result);
            else
                return NotFound();
        }

        
        [HttpPost]
        [Route("/SalvarMaterial")]
        [Authorize(Roles = "admin")]
        public IActionResult SalvarMaterial([FromBody] CreateMaterialDto materialDto)
        {
            var  result = _materialService.SalvarMaterial(materialDto);

            if (result.IsFailed)
                return StatusCode(500);
            else
                return Ok(result);
        }

        [HttpPost]
        [Route("/UpdateMaterial")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateMaterial([FromBody] CreateMaterialDto materialDto, int id)
        {
            var result = _materialService.UpdateMaterial(materialDto, id);

            if (result.IsFailed)
                return StatusCode(500);
            else
                return Ok(result);
        }


        [HttpDelete]
        [Route("/DeletarMaterial")]
        [Authorize(Roles = "admin")]
        public IActionResult DeletarMaterial(int id)
        {
            var result = _materialService.DeletaMaterial(id);
            if (result.IsFailed)
                return StatusCode(500);
            else
                return Ok(result);
        }


    }
}