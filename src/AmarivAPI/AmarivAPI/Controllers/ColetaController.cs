using AmarivAPI.Data.Dtos;
using AmarivAPI.Data.Dtos.ColetasDto;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Mvc;

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



        [HttpGet]
        [Route("/RecuperaColeta")]
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
        public IActionResult SalvarColeta([FromBody] CreateColetaDto coletaDto, string? funcionarioId)
        {
            var result = _coletaService.SalvarColeta(coletaDto, funcionarioId);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("/UpdateColeta")]
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
        public IActionResult DeletarColeta(int idColeta)
        {
            var result = _coletaService.DeletarColeta(idColeta);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();

        }


    }
}
