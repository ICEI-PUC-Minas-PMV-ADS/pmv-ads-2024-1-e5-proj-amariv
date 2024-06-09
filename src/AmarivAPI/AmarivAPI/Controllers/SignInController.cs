using AmarivAPI.Data.Dtos.TokenDto;
using AmarivAPI.Data.Dtos.UsuarioDtos;
using AmarivAPI.Data.Requests;
using AmarivAPI.Services;
using AmarivAPI.Utils;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        public async Task<IActionResult> CadastraCliente (CreateUsuarioDto createDto)
        {
            Result resultado = await _usuarioService.CadastraCliente(createDto);
            if(resultado.IsFailed)
            {
                return StatusCode(500);
            }
            return Ok(resultado.Successes);
        }

        [HttpPost("/signin-funcionario")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CadastraFuncionario(CreateUsuarioDto createDto)
        {
            Result resultado = await _usuarioService.CadastraFuncionario(createDto);
            if (resultado.IsFailed)
            {
                return StatusCode(500);
            }
            return Ok(resultado.Successes);
        }

        [HttpPost("/solicita-confirmacao")]
        public async Task<IActionResult> SolicitaConfirmacao(SolicitaConfirmacaoRequest request)
        {
            Result resultado = await _usuarioService.SolicitaConfirmacao(request);
            if (resultado.IsFailed)
            {
                return StatusCode(500);
            }
            return Ok(resultado.Successes);
        }

        [HttpPost("/confirma-email")]
        public IActionResult ConfirmaEmail(ConfirmaEmailRequest request)
        {
            Result resultado = _usuarioService.ConfirmaEmail(request);
            if(resultado.IsFailed)
            {
                return StatusCode(500);
            }
            return Ok(resultado.Successes);
        }

        [HttpPost("/emaildisponivel")]
        public IActionResult ValidaEmail([FromBody]ValidaEmailRequest request)
        {
            var resultado = _usuarioService.EmailDisponivel(request);
            if (resultado)
            {
                return Ok();
            }
            return StatusCode(StatusCodes.Status302Found);
        }

        [HttpPost("/googlelogin")]
        public async Task<IActionResult> CadastraCliente(ExternalTokenDTO token)
        {
            Result resultado = await _usuarioService.Google(token);
            if (resultado.IsFailed)
            {
                return StatusCode(500);
            }
            return Ok(resultado.Successes);
        }
    }
}
