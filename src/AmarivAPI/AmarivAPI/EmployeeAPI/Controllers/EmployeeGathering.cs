using AmarivAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.EmployeeAPI.Controllers
{
    [ApiController]
    public class EmployeeGathering : Controller
    {
        [HttpGet]
        [Route("/Emp/GetStartPosition")]
        [Authorize(Roles = "funcionario")]
        public IActionResult GetStartPosition()
        {
            return Ok(new {
                Lat = -20.011797786643303,
                Lon = -44.04028383548903,
            });
        }

        [HttpGet]
        [Route("/Emp/GetNextGathering")]
        [Authorize(Roles = "funcionario")]
        public IActionResult GetNextGathering()
        {
            return Ok(new RoteiroDeColetas()
            {
                Id = 1,
                FuncionarioId = "4bf1eb69-9ad5-4d35-907d-c8134b6e1134",
                DataRoteiro = DateTime.Now.AddDays(2),
                Status = false,
                Delete = false,
                NumeroDeColetas = 4,
                NumeroMaxColetas = 5,
                ItemsDeRoteiroDeColeta = new List<ItemRoteiroDeColeta>() {
                    new ItemRoteiroDeColeta() {
                        Id = 1,
                        Id_RoreiroDeColetas = 1,
                        Id_Coletas = 1,
                        PosicaoLista = 2,
                        IsActive = true,
                        GeoLocation = new ItemRoteiroDeColetaPos()
                        {
                            Lat = -20.01558318801328,
                            Lon = -44.024647952440255,
                        }
                    },
                    new ItemRoteiroDeColeta() {
                        Id = 2,
                        Id_RoreiroDeColetas = 1,
                        Id_Coletas = 1,
                        PosicaoLista = 1,
                        IsActive = false,
                        GeoLocation = new ItemRoteiroDeColetaPos()
                        {
                            Lat = -20.027843675601602,
                            Lon = -44.02788965668057,
                        }
                    },
                    new ItemRoteiroDeColeta() {
                        Id = 3,
                        Id_RoreiroDeColetas = 1,
                        Id_Coletas = 1,
                        PosicaoLista = 3,
                        IsActive = true,
                        GeoLocation = new ItemRoteiroDeColetaPos()
                        {
                            Lat = -20.02679261639446,
                            Lon = -44.03252688204672,
                        }
                    },
                    new ItemRoteiroDeColeta() {
                        Id = 4,
                        Id_RoreiroDeColetas = 1,
                        Id_Coletas = 1,
                        PosicaoLista = 4,
                        IsActive = true,
                        GeoLocation = new ItemRoteiroDeColetaPos()
                        {
                            Lat = -20.021467153225817,
                            Lon = -44.03118749771764,
                        }
                    }
                },
            });
        }
    }
}
