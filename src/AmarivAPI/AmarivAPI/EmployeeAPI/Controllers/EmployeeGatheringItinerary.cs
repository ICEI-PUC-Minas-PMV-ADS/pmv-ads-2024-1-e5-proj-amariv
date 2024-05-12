using AmarivAPI.Data;
using AmarivAPI.Models;
using FluentResults;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetStartPosition()
        {
            return Ok(new {
                lat = 0.0,
                lon = 0.0,
            });
        }

        [Route("/Emp/CreateGatheringItinerary")]
        public IActionResult generateGatheringItineraryData()
        {
            try
            {
                var today = DateTime.Now;
                var userId = User.Claims.FirstOrDefault(x => x.Type == "Id").Value;

                var gIt = new RoteiroDeColetas()
                {
                    FuncionarioId = userId,
                    DataCadastro = today,
                    DataRoteiro = today.AddDays(2),
                    Delete = false,
                    NumeroDeColetas = 4,
                    NumeroMaxColetas = 5,
                };
                var gIt_id = _context.RoteiroDeColetas.Add(gIt).Entity.Id;
                _context.SaveChanges();
                {
                    var addr = new Endereco()
                    {
                        Logradouro = "Rua A",
                        Numero = "100",
                        Bairro = "Almeiras",
                        Cep = "01001-000",
                        Referencia = "Prox a igreja",
                    };
                    var addr_id = _context.Enderecos.Add(addr).Entity.Id;
                    _context.SaveChanges();

                    var gOne = new Coleta()
                    {
                        RoteiroColetaId = gIt_id,
                        AprovacaoAdmin = true,
                        ClienteCel = "31 90000-0001",
                        ClienteNome = "Pedro",
                        DataCadastro = today.AddDays(2),
                        Delete = false,
                        EnderecoId = addr_id
                    };
                    _context.Coletas.Add(gOne);
                    _context.SaveChanges();
                }
                {
                    var addr = new Endereco()
                    {
                        Logradouro = "Rua B",
                        Numero = "120",
                        Bairro = "Almeiras",
                        Cep = "01001-001",
                        Referencia = "Prox ao supermercado",
                    };
                    var addr_id = _context.Enderecos.Add(addr).Entity.Id;
                    _context.SaveChanges();

                    var gOne = new Coleta()
                    {
                        RoteiroColetaId = gIt_id,
                        AprovacaoAdmin = true,
                        ClienteCel = "31 90000-0002",
                        ClienteNome = "Joao",
                        DataCadastro = today.AddDays(2),
                        Delete = false,
                        EnderecoId = addr_id
                    };
                    _context.Coletas.Add(gOne);
                    _context.SaveChanges();
                }
                {
                    var addr = new Endereco()
                    {
                        Logradouro = "Rua C",
                        Numero = "140",
                        Bairro = "Almeiras",
                        Cep = "01001-002",
                        Referencia = "",
                    };
                    var addr_id = _context.Enderecos.Add(addr).Entity.Id;
                    _context.SaveChanges();

                    var gOne = new Coleta()
                    {
                        RoteiroColetaId = gIt_id,
                        AprovacaoAdmin = true,
                        ClienteCel = "31 90000-0003",
                        ClienteNome = "Maria",
                        DataCadastro = today.AddDays(2),
                        Delete = false,
                        EnderecoId = addr_id
                    };
                    _context.Coletas.Add(gOne);
                    _context.SaveChanges();
                }
                {
                    var addr = new Endereco()
                    {
                        Logradouro = "Rua D",
                        Numero = "160",
                        Bairro = "Almeiras",
                        Cep = "01001-003",
                        Referencia = "",
                    };
                    var addr_id = _context.Enderecos.Add(addr).Entity.Id;
                    _context.SaveChanges();

                    var gOne = new Coleta()
                    {
                        RoteiroColetaId = gIt_id,
                        AprovacaoAdmin = true,
                        ClienteCel = "31 90000-0004",
                        ClienteNome = "Joaquina",
                        DataCadastro = today.AddDays(2),
                        Delete = false,
                        EnderecoId = addr_id
                    };
                    _context.Coletas.Add(gOne);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return Unauthorized(new
                {
                    message = "Failed to create data",
                });
            }
            return Ok(new { });
        }


        [Route("/Emp/GetGatheringItinerary")]
        public IActionResult GetGatheringItinerary()
        {
            return Ok(new RoteiroDeColetas[]
            {                
            });
        }
    }
}
