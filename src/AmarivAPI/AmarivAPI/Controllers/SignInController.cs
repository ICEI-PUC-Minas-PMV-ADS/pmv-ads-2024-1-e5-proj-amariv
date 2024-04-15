using AmarivAPI.Data.Dtos;
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
            Result resultado = _usuarioService.CadastraUsuario(createDto);
            if(resultado.IsFailed)
            {
                return StatusCode(500);
            }
            return Ok();
        }
    }
}
