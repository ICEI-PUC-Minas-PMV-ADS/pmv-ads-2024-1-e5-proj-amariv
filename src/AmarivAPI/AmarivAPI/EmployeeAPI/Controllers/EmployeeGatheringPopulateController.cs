using AmarivAPI.Data;
using AmarivAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AmarivAPI.EmployeeAPI.Controllers
{
    [ApiController]
    public class EmployeeGatheringPopulateController : Controller
    {
        private AmarivContext _context;
        public EmployeeGatheringPopulateController(AmarivContext context)
        {
            _context = context;
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
                            Logradouro = "Rua Aldomário Soares Pinto",
                            Numero = "115",
                            Bairro = "Maria Ortiz",
                            Cep = "29072-230",
                            Cidade = "Vitória",
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
                            Lat = -20.25866334503462,
                            Lon = -40.29376372522745,
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
                            Logradouro = "Rua Profa. Odila Simões",
                            Numero = "245",
                            Bairro = "Maria Ortiz",
                            Cidade = "Vitória",
                            Cep = "29070-330",
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
                            Lat = -20.25567221825709,
                            Lon = -40.29552252179683,
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
                            Logradouro = "Rua Armando Moreira de Oliveira",
                            Numero = "119",
                            Bairro = "Goiabeiras",
                            Cidade = "Vitória",
                            Cep = "29075-075",
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
                            Lat = -20.266196920806085,
                            Lon = -40.299065504665485,
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
                            Logradouro = "Rua Waldyr Meireles",
                            Numero = "188",
                            Bairro = "Consolação",
                            Cidade = "Vitória",
                            Cep = "29045-670",
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
                            Lat = -20.30503096328269,
                            Lon = -40.3126671099669,
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
            catch (Exception)
            {
                return Unauthorized(new
                {
                    message = "Failed to create data",
                });
            }
            return Ok(new { });
        }
    }
}
