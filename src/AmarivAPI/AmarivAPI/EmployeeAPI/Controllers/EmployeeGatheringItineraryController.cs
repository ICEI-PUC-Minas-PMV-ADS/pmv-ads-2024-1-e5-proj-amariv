﻿using AmarivAPI.Data;
using AmarivAPI.EmployeeAPI.Data.DTOs;
using AmarivAPI.EmployeeAPI.Mappers;
using AmarivAPI.Models;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmarivAPI.EmployeeAPI.Controllers
{
    [ApiController]
    public class EmployeeGatheringItinerary : Controller
    {
        private AmarivContext _context;
        public EmployeeGatheringItinerary(AmarivContext context) {
            _context = context;
        }

        [Route("/Emp/GetStartPosition")]
        [Authorize(Roles = "funcionario")]
        public IActionResult GetStartPosition()
        {
            return Ok(new {
                lat = StartPosition.lat,
                lon = StartPosition.lon,
            });
        }

        [Route("/Emp/GetGatheringItinerary")]
        [Authorize(Roles = "funcionario")]
        public IActionResult GetGatheringItinerary()
        {
            var result = new List<object>();
            var userId = User.Claims.FirstOrDefault(x => x.Type == "id").Value;
            var gatheringItinerary = _context.RoteiroDeColetas
                .Include("Funcionario")
                .Include("Coletas")
                .Include("Coletas.Endereco")
                .Where(x =>
                    x.FuncionarioId == userId &&
                    x.DataRoteiro.Date >= DateTime.Today.Date &&
                    x.Delete == false
                )
                .OrderBy(x => x.DataRoteiro)
                .FirstOrDefault();
            if (gatheringItinerary != null)
            {
                result.Add(new RoteiroDeColetaMapper(_context, gatheringItinerary).ToJson());
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("/Emp/GetRoteiroDeColetaDate")]
        [Authorize(Roles = "funcionario")]

        public IActionResult GetColetasByDate(int roteiroDeColetaId)
        {
            var roteiroDeColeta = _context.RoteiroDeColetas.Where(x => x.Id == roteiroDeColetaId).FirstOrDefault();
            if (roteiroDeColeta == null)
            {
                return NotFound(new
                {
                    message = "O Roteiro de coleta solicitado não foi localizado!",
                });
            }
            return Ok(roteiroDeColeta.DataRoteiro.Date);
        }

        [HttpPost()]
        [Route("/Emp/ChangeGatheringOrder")]        
        [Authorize(Roles = "funcionario")]
        public IActionResult ChangeGatheringOrder(ChangeGatheringOrderDTO dto)
        {
            try
            {
                var gatheringItinerary = _context.RoteiroDeColetas.Where(x => x.Id == dto.Id).FirstOrDefault();
                if (gatheringItinerary == null)
                {
                    return BadRequest(new
                    {
                        message = "Falha ao recuperar roteiro de coleta.",
                    });
                }

                var affectedRoutesList = dto.RouteIdMap.Select(x => {
                    int value = -1;
                    if (!x.TryGetValue("id", out value))
                    {
                        throw new Exception();
                    }
                    return value;
                }).ToList();

                var coletas = _context.Coletas.Where(x => affectedRoutesList.Contains(x.Id)).ToList();
                if (coletas.Count() == 0 || coletas.Count() != affectedRoutesList.Count)
                {
                    return BadRequest(new
                    {
                        message = "Falha ao recuperar registro de coletas",
                    });
                }
                using (var t = _context.Database.BeginTransaction())
                {
                    var currentPosition = 1;
                    var todasAsColetas = _context.Coletas.Where(x => x.RoteiroColetaId == gatheringItinerary.Id &&
                        x.Delete == false
                    ).ToList();

                    for (int i = 0; i < todasAsColetas.Count; i++)
                    {
                        todasAsColetas[i].PosicaoLista = null;
                    }
                    for (int i = 0; i < affectedRoutesList.Count; i++)
                    {
                        var coletaId = affectedRoutesList.ElementAt(i);
                        var coleta = todasAsColetas.Where(x => x.Id == coletaId).FirstOrDefault();
                        if (coleta == null)
                        {
                            return BadRequest(new
                            {
                                message = "Falha ao recuperar registro de coletas",
                            });
                        }

                        var item = dto.RouteIdMap.Single(x => {
                            int value = -1;
                            if (!x.TryGetValue("id", out value))
                            {
                                throw new Exception();
                            }
                            return value == coletaId;
                        });

                        var newPosicaoLista = -1;
                        if (!item.TryGetValue("posicaoLista", out newPosicaoLista))
                        {
                            throw new Exception();
                        }
                        coleta.PosicaoLista = newPosicaoLista + 1;
                        currentPosition = newPosicaoLista + 1;

                        _context.Coletas.Entry(coleta).CurrentValues.SetValues(coleta);
                        _context.SaveChanges();
                    }
                    for (int i = 0; i < todasAsColetas.Count; i++)
                    {
                        if (todasAsColetas[i].PosicaoLista == null)
                        {
                            currentPosition += 1;
                            todasAsColetas[i].PosicaoLista = currentPosition;

                            _context.Coletas.Entry(todasAsColetas[i]).CurrentValues.SetValues(todasAsColetas[i]);
                            _context.SaveChanges();
                        }
                    }
                    t.Commit();
                }
                return Ok(new RoteiroDeColetaMapper(_context, gatheringItinerary).ToJson());
            }
            catch (Exception)
            {
                return BadRequest(new
                {
                    message = "Falha ao recuperar registro de coletas",
                });
            }
        }
    }
}
