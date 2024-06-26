﻿using AmarivAPI.Models;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [ApiController]
    public class ListaColetasController : Controller
    {
        private ListaColetasService _service;

        public ListaColetasController(ListaColetasService service)
        {
            _service = service;
        }

        [Route("coletas")]
        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_service.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                });
            }
        }

        [HttpGet]
        [Route("coletas/AprovarColeta")]
        [Authorize(Roles = "admin")]
        public IActionResult AprovarColeta(int Id)
        {
            try
            {
                return Ok(_service.AprovarColeta(Id));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                });
            }
        }

        [HttpGet]
        [Route("coletas/RecusarColeta")]
        [Authorize(Roles = "admin")]
        public IActionResult RecusarColeta(int Id)
        {
            try
            {
                return Ok(_service.RecusarColeta(Id));
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                });
            }
        }
    }
}
