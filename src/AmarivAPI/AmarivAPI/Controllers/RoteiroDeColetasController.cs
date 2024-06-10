
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace AmarivAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoteiroDeColetasController : Controller
    {

        private RoteiroDeColetasService _roteiroService;

        public RoteiroDeColetasController(RoteiroDeColetasService roteiroService )
        {
            _roteiroService = roteiroService;
        }


        [HttpGet]
        [Route("/RecuperaRoteiroDeColetas")]
        [Authorize(Roles = "admin")]
        public IActionResult RecuperaRoteiroDeColetas(int id)
        {
           var result = _roteiroService.RecuperaRoteiroDeColetas(id);
            if (result != null)
                return Json(result);
            else
                return NotFound();
        }

        [HttpGet]
        [Route("/RecuperaTodosRoteirosDeColetas")]
        [Authorize(Roles = "admin")]
        public IActionResult RecuperaTodosRoteirosDeColetas()
        {
            var result = _roteiroService.RecuperaTodosRoteiroColetas();
            if (result != null)
                return Json(result);
            else
                return NotFound();
        }

      
        [HttpPost]
        [Route("/SalvarRoteiroDeColetas")]
        [Authorize(Roles = "admin")]
        public IActionResult SalvarRoteiroDeColetas([FromBody] CreateRoteiroDeColetasDto roteiroDto)
        {
          var result =  _roteiroService.SalvarRoteiroDeColeta(roteiroDto);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpPost]
        [Route("/UpdateRoteiroDeColetas")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateRoteiroDeColetas([FromBody] UpdateRoteiroDeColetasDto roteiroDto, int id)
        {
          var result =  _roteiroService.UpdateRoteiroDeColeta(roteiroDto, id);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();

        }

        [HttpPost]
        [Route("/UpdateNumMaxRoteiroDeColetas")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateRoteiroDeColetas([FromBody]  int numeroMaxColetas, int id)
        {
            var result = _roteiroService.UpdateRoteiroDeColeta(numeroMaxColetas , id);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
        }


        [HttpPost]
        [Route("/AdicionaColetaRoteiroDeColetas")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateRoteiroDeColetas(int id)
        {
            var result = _roteiroService.UpdateRoteiroDeColeta(id);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
        }


        [HttpPost]
        [Route("/DeletaRoteiroDeColetas")]
        [Authorize(Roles = "admin")]
        public IActionResult DeletaRoteiroDeColetas(int id)
        {
            var result = _roteiroService.DeletaRoteiroDeColetas(id);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
        }

        [HttpGet]
        [Route("/datasindisponiveis")]
        [Authorize(Roles = "admin")]
        public IActionResult RecuperaDatasIndisponiveis()
        {
            var result = _roteiroService.DatasIndisponiveisAPartirDeHoje();
            if (result != null)
                return Json(result);
            else
                return NotFound();
        }

    }
}