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
    }
}
