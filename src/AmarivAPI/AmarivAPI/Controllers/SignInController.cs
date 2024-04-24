using AmarivAPI.Data.Dtos;
using AmarivAPI.Models;
using AmarivAPI.Services;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SignInController: ControllerBase
    {
        public UsuarioService _usuarioService;

        public SignInController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public IActionResult CadastraUsuario (CreateUsuarioDto createDto)
        {
            var hasUserWithEmail = _usuarioService.hasEmail(createDto.Email);
            if (hasUserWithEmail.Value)
            {
                return StatusCode(500, new {
                    Title = "Este email ja esta em uso!",
                });
            }
            Result<Usuario> resultado = _usuarioService.CadastraUsuario(createDto);
            if(resultado.IsFailed)
            {
                return StatusCode(500);
            }
            return Ok(resultado.Value);
        }
    }
}
