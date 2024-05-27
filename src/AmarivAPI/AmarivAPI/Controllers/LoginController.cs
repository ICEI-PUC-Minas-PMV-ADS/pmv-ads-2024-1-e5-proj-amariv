using AmarivAPI.Data.Dtos.UsuarioDtos;
using AmarivAPI.Data.Requests;
using AmarivAPI.Services;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController: ControllerBase
    {
        public UsuarioService _usuarioService;

        public LoginController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public IActionResult LogaUsuario (LoginRequest request)
        {
            Result resultado = _usuarioService.LogaUsuario(request);
            if (resultado.IsFailed)
            {
                return Unauthorized(resultado.Errors);
            }
            return Ok(resultado.Successes);
        }

        [HttpPost("/atualizarusuario")]
        [Authorize]
        public IActionResult AlteraUsuario([FromBody]UpdateUsuarioDto dto)
        {
            string userId = User.FindFirst("id").Value;
            Result resultado = _usuarioService.AlteraUsuario(dto, userId);
            if (resultado.IsFailed)
            {
                return StatusCode(500);
            }
            return Ok(resultado.Successes);
        }

        [HttpGet("/user")]
        [Authorize]
        public IActionResult RecuperaUsuario () {
            string userId = User.FindFirst("id").Value;
            ReadUsuarioDto user = _usuarioService.RecuperaReadUsuarioDtoPorId(userId);

            return Ok(user);
        }

        [HttpPost("/solicita-recuperacao")]
        public IActionResult SolicitaRecuperacao(SolicitaRecuperacaoRequest request)
        {
            Result resultado = _usuarioService.SolicitaRecuperacao(request);
            if (resultado.IsFailed)
            {
                return Unauthorized(resultado.Errors);
            }
            return Ok(resultado.Successes); 
        }

        [HttpPost("/recupera-senha")]
        public IActionResult RecuperaSenha(RecuperaSenhaRequest request)
        {
            Result resultado = _usuarioService.RecuperaSenha(request);
            if (resultado.IsFailed)
            {
                return Unauthorized(resultado.Errors);
            }
            return Ok(resultado.Successes);
        }
    }
}
