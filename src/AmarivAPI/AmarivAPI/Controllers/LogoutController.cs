using AmarivAPI.Services;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LogoutController: ControllerBase
    {

        public UsuarioService _usuarioService;
        public LogoutController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Logout()
        {
            Result resultado = _usuarioService.Logout();
            if(resultado.IsFailed)
            {
                return Unauthorized(resultado.Errors);
            }
            return Ok(resultado.Successes);
        }

    }

    
}
