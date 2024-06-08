
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Services;
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
        public IActionResult DeletaRoteiroDeColetas(int id)
        {
            var result = _roteiroService.DeletaRoteiroDeColetas(id);
            if (result.IsSuccess)
                return Ok(result);
            else
                return NotFound();
        }

    }
}