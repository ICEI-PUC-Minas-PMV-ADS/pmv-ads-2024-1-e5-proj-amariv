using AmarivAPI.Data.Requests;
using AmarivAPI.Services;
using FluentResults;
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
