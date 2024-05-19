using AmarivAPI.Data;
using AmarivAPI.EmployeeAPI.Data.DTOs;
using AmarivAPI.EmployeeAPI.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
                    gathering.Status = true;
                    gathering.IsSuccess = dto.isSuccess;

                    _context.Coletas.Entry(gathering).CurrentValues.SetValues(gathering);
                    _context.SaveChanges();

                    _t.Commit();

                    var gatheringItinerary = _context.RoteiroDeColetas.Where(x => x.Id == dto.gatheringItineraryId).FirstOrDefault();
                    if (gatheringItinerary == null)
                    {
                        return NotFound(new
                        {
                            message = "Roteiro de coleta não localizado!",
                        });
                    }
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
