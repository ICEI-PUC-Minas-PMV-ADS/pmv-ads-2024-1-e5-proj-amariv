using AmarivAPI.Data;
using AmarivAPI.EmployeeAPI.Data.DTOs;
using AmarivAPI.EmployeeAPI.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmarivAPI.EmployeeAPI.Controllers
{
    [ApiController]
    public class EmployeeGatheringController : Controller
    {
        private AmarivContext _context;

        public EmployeeGatheringController(AmarivContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("/Emp/SetFinishGathering")]
        [Authorize(Roles = "funcionario")]
        public IActionResult SetFinishGathering(SetFinishGatheringDTO dto)
        {
            try
            {
                using (var _t = _context.Database.BeginTransaction())
                {   
                    var gathering = _context.Coletas.Where(x => x.Id == dto.gatheringId).FirstOrDefault();
                    if (gathering == null)
                    {
                        return NotFound(new
                        {
                            message = "Coleta não localizado!",
                        });
                    }
                    if (gathering.DataDeColeta.Date < dto.StartDate && gathering.DataDeColeta.Date > dto.EndDate)
                    {
                        return NotFound(new
                        {
                            message = "Não é possivel finalizar a coleta pois não esta na data da coleta!",
                        });
                    }                    
                    if (dto.isSuccess)
                    {
                        gathering.IsSuccess = true;
                    }
                    else
                    {
                        gathering.Cancelada = true;
                    }
                    gathering.Status = true;

                    _context.Coletas.Entry(gathering).CurrentValues.SetValues(gathering);
                    _context.SaveChanges();

                    _t.Commit();

                    var gatheringItinerary = _context.RoteiroDeColetas
                        .Include("Funcionario")
                        .Include("Coletas")
                        .Include("Coletas.Endereco")
                        .Where(x => x.Id == dto.gatheringItineraryId)
                        .FirstOrDefault();

                    if (gatheringItinerary == null)
                    {
                        return NotFound(new
                        {
                            message = "Roteiro de coleta não localizado!",
                        });
                    }
                    /*if (gatheringItinerary.Coletas.Count == 0)
                    {
                        gatheringItinerary.Status = true;

                        _context.RoteiroDeColetas.Entry(gatheringItinerary).CurrentValues.SetValues(gatheringItinerary);
                        _context.SaveChanges();
                    }*/                  
                    return Ok(new RoteiroDeColetaMapper(_context, gatheringItinerary).ToJson());
                }                
            }
            catch (Exception)
            {
                return NotFound(new
                {
                    message = "Falha no servidor!",
                });
            }            
        }
    }
}
