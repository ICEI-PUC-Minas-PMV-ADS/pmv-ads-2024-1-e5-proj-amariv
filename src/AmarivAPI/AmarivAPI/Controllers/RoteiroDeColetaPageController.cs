using AmarivAPI.Data.Dtos.RoteiroDeColetaPageDto;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Models;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AmarivAPI.Controllers
{
    [ApiController]
    public class RoteiroDeColetaPageController : Controller
    {
        private RoteiroDeColetasService _roteiroService;
        private ColetaService _coletaService;
        private RoteiroDeColetaPageService _roteiroPageService;

        public RoteiroDeColetaPageController(
            RoteiroDeColetasService roteiroService,
            ColetaService celetaService,
            RoteiroDeColetaPageService roteiroPageService
        ) {
            _roteiroService = roteiroService;
            _coletaService = celetaService;
            _roteiroPageService = roteiroPageService;
        }

        [HttpGet]
        [Route("/GetValidRoteiroDeColetas")]
        [Authorize(Roles = "admin")]

        public IActionResult GetValidRoteiroDeColetas()
        {
            return Ok(_roteiroService.GetValidRoteiroDeColetas());
        }

        [HttpGet]
        [Route("/GetStartPosition")]
        [Authorize(Roles = "admin")]

        public IActionResult GetStartPosition()
        {
            return Ok(new
            {
                lat = StartPosition.lat,
                lon = StartPosition.lon,
            });
        }

        [HttpPost]
        [Route("/SaveRoteiroDeColeta")]
        [Authorize(Roles = "admin")]

        public IActionResult SaveRoteiroDeColeta(SaveRoteiroDeColetaDto dto)
        {
            try
            {
                if (dto.StartDate.Date < DateTime.Now.Date)
                {
                    return BadRequest(new
                    {
                        message = "Não é possivel agendar uma coleta para uma data que passou!"
                    });
                }
                if (_roteiroPageService.HasRoteiroDeColetaByDate(dto.RoteiroDeColetaId, dto.StartDate, dto.EndDate))
                {
                    return BadRequest(new
                    {
                        message = "Ja existe um roteiro agendado para esta data!"
                    });
                }

                var roCo = _roteiroPageService.GetRoteiroDeColeta(dto.RoteiroDeColetaId);
                if (roCo == null)
                {
                    return BadRequest(new
                    {
                        message = "Não é possivel localizar o roteiro de coleta!"
                    });
                }

                var cols = _coletaService.GetColetasByRoteiroDeColeta(dto.RoteiroDeColetaId);
                if (roCo.DataRoteiro.Date != dto.StartDate.Date)
                {
                    if (cols.Count > 0)
                    {
                        return BadRequest(new
                        {
                            message = "Não é possivel alterar a data, pois, ja existem coletas cadastradas!"
                        });
                    }
                }
                if (dto.MaxNumColeta < cols.Count)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta não pode ser alterado, pois, o numero maximo de coletas sera excedido!",
                    });
                }
                var roteiroDeColeta = _roteiroService.SaveRoteiroDeColeta(dto);

                var coletasPorRoteiro = _coletaService.GetColetasByRoteiroDeColeta(roteiroDeColeta.Id);
                var coletasPorData = _coletaService.GetColetasByDateWithoutRoteiroDeColeta(dto.StartDate, dto.EndDate);

                return Ok(new
                {
                    roteiroDeColeta,
                    coletasRoteiro = coletasPorRoteiro,
                    coletasAprovadas = coletasPorData,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                });
            }
        }

        [HttpPost]
        [Route("/CreateRoteiroDeColeta")]
        [Authorize(Roles = "admin")]

        public IActionResult CreateRoteiroDeColeta(CriarRoteiroDeColetaDto dto)
        {
            try
            {
                if (dto.StartDate.Date < DateTime.Now.Date)
                {
                    return BadRequest(new
                    {
                        message = "Não é possivel agendar uma coleta para uma data que passou!"
                    });
                }
                if (_roteiroService.GetRoteiroDeColetaByDate(dto.StartDate, dto.EndDate))
                {
                    return BadRequest(new
                    {
                        message = "Ja existe um roteiro agendado para esta data!"
                    });
                }
                var roteiroDeColeta = _roteiroService.CreateRoteiroDeColeta(dto);

                var coletasPorRoteiro = _coletaService.GetColetasByRoteiroDeColeta(roteiroDeColeta.Id);
                var coletasPorData = _coletaService.GetColetasByDateWithoutRoteiroDeColeta(dto.StartDate, dto.EndDate);

                return Ok(new
                {
                    roteiroDeColeta,
                    coletasRoteiro = coletasPorRoteiro,
                    coletasAprovadas = coletasPorData,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message,
                });
            }
        }

        [HttpGet]
        [Route("/GetRoteiroDeColetaDate")]
        [Authorize(Roles = "admin")]

        public IActionResult GetColetasByDate(int roteiroDeColetaId)
        {
            var roteiroDeColeta = _roteiroService.RecuperaRoteiroDeColetas(roteiroDeColetaId);
            if (roteiroDeColeta == null)
            {
                return NotFound(new
                {
                    message = "O Roteiro de coleta solicitado não foi localizado!",
                });
            }
            return Ok(roteiroDeColeta.DataRoteiro.Value.Date);
        }

        [HttpPost]
        [Route("/GetColetasByDate")]
        [Authorize(Roles = "admin")]

        public IActionResult GetColetasByDate(GetColetasByDateDto dto)
        {
            try
            {
                var roteiroDeColeta = _roteiroService.RecuperaRoteiroDeColetas(dto.RoteiroDeColetaId);
                if (roteiroDeColeta == null)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta solicitado não foi localizado!",
                    });
                }
                if (roteiroDeColeta.DataRoteiro == null)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta solicitado não possui todas as informações necessarias!",
                    });
                }
                var coletasPorRoteiro = _coletaService.GetColetasByRoteiroDeColeta(dto.RoteiroDeColetaId);
                var coletasPorData = _coletaService.GetColetasByDateWithoutRoteiroDeColeta(dto.StartDate, dto.EndDate);

                return Ok(new
                {
                    roteiroDeColeta,
                    coletasRoteiro = coletasPorRoteiro,
                    coletasAprovadas = coletasPorData,
                });
            }
            catch (Exception)
            {
                return NotFound(new
                {
                    message = "O Roteiro de coleta solicitado não foi localizado!",
                });
            }
        }

        [HttpPost]
        [Route("/OrdenaRoteiroDeColeta")]
        [Authorize(Roles = "admin")]

        public object OrdenaRoteiroDeColeta(OrdenaRoteiroDeColetasDto dto)
        {
            return _roteiroService.OrdenaRoteiroDeColeta(dto);
        }

        [HttpPost]
        [Route("/AddRouteToRoteiroDeColeta")]

        public object AddRouteToRoteiroDeColeta(AddRouteToRoteiroDeColetaDto dto)
        {
            try
            {
                var coletaToUpdate = _roteiroPageService.GetColeta(dto.ColetaId);
                if (coletaToUpdate == null)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta solicitado não foi localizado!",
                    });
                }

                var roteiroDeColeta = _roteiroPageService.RecuperaRoteiroDeColetas(dto.RoteiroDeColetaId);
                if (roteiroDeColeta == null)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta solicitado não foi localizado!",
                    });
                }
                if (roteiroDeColeta.NumeroDeColetas + 1 > roteiroDeColeta.NumeroMaxColetas)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta solicitado atingiu o limite de coletas!",
                    });
                }

                var coletasPorRoteiroTemp = _roteiroPageService.GetColetasByRoteiroDeColeta(dto.RoteiroDeColetaId);
                var nextPos = 0;

                coletasPorRoteiroTemp.ForEach(co => {
                    if (co.PosicaoLista != null)
                    {
                        if (co.PosicaoLista > nextPos)
                        {
                            nextPos = co.PosicaoLista.Value;
                        }
                    }
                });

                coletaToUpdate.RoteiroColetaId = roteiroDeColeta.Id;
                coletaToUpdate.PosicaoLista = nextPos + 1;

                _roteiroPageService.SaveColeta(coletaToUpdate);

                roteiroDeColeta.NumeroDeColetas += 1;

                _roteiroPageService.SaveRoteiroDeColeta(roteiroDeColeta);

                return Ok(new
                {
                    roteiroDeColeta = _roteiroService.RecuperaRoteiroDeColetas(dto.RoteiroDeColetaId),
                    coletasRoteiro = _coletaService.GetColetasByRoteiroDeColeta(dto.RoteiroDeColetaId),
                    coletasAprovadas = _coletaService.GetColetasByDateWithoutRoteiroDeColeta(dto.StartDate, dto.EndDate),
                });
            }
            catch (Exception)
            {
                return NotFound(new
                {
                    message = "O Roteiro de coleta solicitado não foi localizado!",
                });
            }
        }

        [HttpPost]
        [Route("/RemoveRouteToRoteiroDeColeta")]
        [Authorize(Roles = "admin")]

        public object RemoveRouteToRoteiroDeColeta(AddRouteToRoteiroDeColetaDto dto)
        {
            try
            {
                var coletaToUpdate = _roteiroPageService.GetColeta(dto.ColetaId);
                if (coletaToUpdate == null)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta solicitado não foi localizado!",
                    });
                }

                var roteiroDeColeta = _roteiroPageService.RecuperaRoteiroDeColetas(dto.RoteiroDeColetaId);
                if (roteiroDeColeta == null)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta solicitado não foi localizado!",
                    });
                }

                coletaToUpdate.RoteiroColetaId = null;
                coletaToUpdate.PosicaoLista = null;

                _roteiroPageService.SaveColeta(coletaToUpdate);

                roteiroDeColeta.NumeroDeColetas -= 1;

                _roteiroPageService.SaveRoteiroDeColeta(roteiroDeColeta);

                return Ok(new
                {
                    roteiroDeColeta = _roteiroService.RecuperaRoteiroDeColetas(dto.RoteiroDeColetaId),
                    coletasRoteiro = _coletaService.GetColetasByRoteiroDeColeta(dto.RoteiroDeColetaId),
                    coletasAprovadas = _coletaService.GetColetasByDateWithoutRoteiroDeColeta(dto.StartDate, dto.EndDate),
                });
            }
            catch (Exception)
            {
                return NotFound(new
                {
                    message = "O Roteiro de coleta solicitado não foi localizado!",
                });
            }
        }

        [HttpPost]
        [Route("/RoteiroCancelarColeta")]
        [Authorize(Roles = "admin")]

        public IActionResult CancelarColeta(CancelarColetaDto dto) {
            try
            {
                _roteiroPageService.CancelarColeta(dto.ColetaId);

                var roteiroDeColeta = _roteiroPageService.RecuperaRoteiroDeColetas(dto.RoteiroDeColetaId);
                if (roteiroDeColeta == null)
                {
                    return NotFound(new
                    {
                        message = "O Roteiro de coleta solicitado não foi localizado!",
                    });
                }

                return Ok(new
                {
                    roteiroDeColeta = _roteiroService.RecuperaRoteiroDeColetas(dto.RoteiroDeColetaId),
                    coletasRoteiro = _coletaService.GetColetasByRoteiroDeColeta(dto.RoteiroDeColetaId),
                    coletasAprovadas = _coletaService.GetColetasByDateWithoutRoteiroDeColeta(dto.StartDate, dto.EndDate),
                });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
