using AmarivAPI.Data;
using AmarivAPI.Models;
using FluentResults;
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
        public IActionResult GetStartPosition()
        {
            return Ok(new {
                lat = -20.023420422539655,
                lon = -44.03434894706644,
            });
        }

        [Route("/Emp/CreateGatheringItinerary")]
        public IActionResult generateGatheringItineraryData()
        {
            try
            {
                using (var t = _context.Database.BeginTransaction())
                {
                    var today = DateTime.Now;
                    var userId = User.Claims.FirstOrDefault(x => x.Type == "id").Value;

                    var gIt = new RoteiroDeColetas()
                    {
                        FuncionarioId = userId,
                        DataCadastro = today,
                        DataRoteiro = today.AddDays(2),
                        Delete = false,
                        NumeroDeColetas = 4,
                        NumeroMaxColetas = 5,
                    };
                    _context.RoteiroDeColetas.Add(gIt);
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
                        _context.Enderecos.Add(addr);
                        _context.SaveChanges();

                        var gOne = new Coleta()
                        {
                            RoteiroColetaId = gIt.Id,
                            AprovacaoAdmin = true,
                            PosicaoLista = 1,
                            Status = false,
                            ClienteCel = "31 90000-0001",
                            ClienteNome = "Pedro",
                            DataCadastro = today,
                            Delete = false,
                            Lat = 0.0,
                            Lon = 0.0,
                            DataDeColeta = today.AddDays(2),
                            EnderecoId = addr.Id,
                            ListaItensColeta = "1:Metal(level)",
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
                        _context.Enderecos.Add(addr);
                        _context.SaveChanges();

                        var gOne = new Coleta()
                        {
                            RoteiroColetaId = gIt.Id,
                            AprovacaoAdmin = true,
                            PosicaoLista = 2,
                            Status = true,
                            ClienteCel = "31 90000-0002",
                            ClienteNome = "Joao",
                            DataCadastro = today,
                            Delete = false,
                            Lat = 0.0,
                            Lon = 0.0,
                            DataDeColeta = today.AddDays(2),
                            EnderecoId = addr.Id,
                            ListaItensColeta = "1:Metal(level)",
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
                        _context.Enderecos.Add(addr);
                        _context.SaveChanges();

                        var gOne = new Coleta()
                        {
                            RoteiroColetaId = gIt.Id,
                            AprovacaoAdmin = true,
                            PosicaoLista = 3,
                            Status = true,
                            ClienteCel = "31 90000-0003",
                            ClienteNome = "Maria",
                            DataCadastro = today,
                            Delete = false,
                            Lat = 0.0,
                            Lon = 0.0,
                            DataDeColeta = today.AddDays(2),
                            EnderecoId = addr.Id,
                            ListaItensColeta = "1:Metal(level)",
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
                        _context.Enderecos.Add(addr);
                        _context.SaveChanges();

                        var gOne = new Coleta()
                        {
                            RoteiroColetaId = gIt.Id,
                            AprovacaoAdmin = true,
                            PosicaoLista = 4,
                            Status = true,
                            ClienteCel = "31 90000-0004",
                            ClienteNome = "Joaquina",
                            DataCadastro = today,
                            Delete = false,
                            Lat = 0.0,
                            Lon = 0.0,
                            DataDeColeta = today.AddDays(2),
                            EnderecoId = addr.Id,
                            ListaItensColeta = "1:Metal(level)",
                        };
                        _context.Coletas.Add(gOne);
                        _context.SaveChanges();
                    }
                    t.Commit();
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
            var userId = User.Claims.FirstOrDefault(x => x.Type == "id").Value;
            var res = _context.RoteiroDeColetas
                .Include("Funcionario")
                .Include("Coletas")
                .Include("Coletas.Endereco")
                .Where(x => x.FuncionarioId == userId)
                .FirstOrDefault();
            return Ok(new List<RoteiroDeColetas>() {
                res
            });
        }
    }
}
