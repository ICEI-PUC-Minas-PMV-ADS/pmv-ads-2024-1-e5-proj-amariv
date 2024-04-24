
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoteiroDeColetasController : Controller
    {

        private RoteiroDeColetasService _roteiroService;
        private ItensRoteiroDeColetasService _itensService;

        public RoteiroDeColetasController(RoteiroDeColetasService roteiroService, ItensRoteiroDeColetasService itensService)
        {
            _roteiroService = roteiroService;
            _itensService = itensService;
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