using AmarivAPI.Data.Dtos;
using AmarivAPI.Data.Dtos.ColetasDto;
using AmarivAPI.Data.Dtos.PaginationDto;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmarivAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ColetaController : Controller
    {
        private ColetaService _coletaService;
        public ColetaController (ColetaService coletaService)
        {
            _coletaService = coletaService;
        }

        [Authorize]
        [HttpGet("/coletasAberto")]
        [Authorize(Roles = "admin")]
        public ActionResult ColetasAberto(int page = 1, int pageSize = 15) {
            string userId = User.FindFirst("id").Value;
            var coletas = _coletaService.ColetasAberto(userId, page, pageSize);
            return Ok(coletas);
        }

        [Authorize]
        [HttpGet("/coletasFinalizado")]
        [Authorize(Roles = "admin")]
        public ActionResult ColetasFinalizado(int page = 1, int pageSize = 15)
        {
            string userId = User.FindFirst("id").Value;
            var coletas = _coletaService.ColetasFinalizado(userId, page, pageSize);
            return Ok(coletas);
        }

        [HttpGet]
        [Route("/RecuperaColeta")]
        [Authorize(Roles = "admin")]
        public IActionResult RecuperaColeta(int id)
        {
            var result = _coletaService.RecuperaColeta(id);
            if (result != null)
                return Json(result);
            else
                return NotFound();
        }

        [HttpGet]
        [Route("/RecuperaTodasColetas")]
        [Authorize(Roles = "admin")]
        public IActionResult RecuperaTodasColetas()
        {
            var result = _coletaService.RecuperaTodasColetas();
            if (result != null)
                return Json(result);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("/SalvarColeta")]
        [Authorize(Roles = "admin")]
        public IActionResult SalvarColeta([FromBody] CreateColetaDto coletaDto)
        {
            var result = _coletaService.SalvarColeta(coletaDto);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("/UpdateColeta")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateColeta([FromBody] UpdateColetaDto coletaDto, int id)
        {
            var result = _coletaService.UpdateColeta(coletaDto, id);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();

        }

        [HttpPost]
        [Route("/InserirColetaEmRoteiro")]
        [Authorize(Roles = "admin")]
        public IActionResult InserirColetaEmRoteiro(int idColeta , int idRoteiro)
        {
            var result = _coletaService.InserirColetaEmRoteiro(idColeta, idRoteiro);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("/DeletarColeta")]
        [Authorize(Roles = "admin")]
        public IActionResult DeletarColeta(int idColeta)
        {
            var result = _coletaService.DeletarColeta(idColeta);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();

        }

        [HttpPost]
        [Route("/cancelarcoleta")]
        [Authorize(Roles = "admin")]
        public IActionResult CancelarColeta(int idColeta)
        {
            var result = _coletaService.CancelarColeta(idColeta);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
    }

        [HttpPost]
        [Route("/VerificaDisponibilidadeColeta")]
        [Authorize(Roles = "admin")]
        public IActionResult VerificaDisponibilidadeRoteiroColeta([FromBody] DateTime data)
        {
            var result = _coletaService.ConsultaDisponibilidadeColeta(data);
            return Json(result);
        }
    }
}