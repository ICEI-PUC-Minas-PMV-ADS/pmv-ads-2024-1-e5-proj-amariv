using AutoMapper;
using FluentResults;
using AmarivAPI.Data.Dtos;
using AmarivAPI.Models;
using AmarivAPI.Data;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;
using AmarivAPI.Data.Dtos.ColetasDto;
using System.Reflection.Metadata.Ecma335;
using AmarivAPI.Data.Dtos.PaginationDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AmarivAPI.Services
{
    public class ColetaService
    {
        public IMapper _mapper;
        public AmarivContext _context {  get; set; }
        public ColetaService(IMapper mapper, AmarivContext context)
        {
            _mapper = mapper;
            _context = context;
        }
       
        public Result<string> SalvarColeta(CreateColetaDto dto )
        {
            RoteiroDeColetas roteiro;
            DateTime dataColeta;
          
            try
            {
                
                Coleta coleta = _mapper.Map<Coleta>(dto);
                dataColeta =  coleta.DataDeColeta;

                var roteiroId = ConsultaDisponibilidadeRoteiroDeColeta(dataColeta);              
                if (roteiroId != 0)
                {
                     roteiro = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == roteiroId && r.NumeroDeColetas < r.NumeroMaxColetas);
                    if (roteiro != null)
                    {
                        roteiro.NumeroDeColetas += 1;
                        coleta.RoteiroColetaId = roteiroId;
                        _context.Add(coleta);
                        _context.SaveChanges();
                        return Result.Ok("A Coleta foi Criada e adicionada ao roteiro com sucesso!!");
                    }
                    else
                    {
                        coleta.RoteiroColetaId = null;
                        _context.Add(coleta);
                        _context.SaveChanges();
                        return Result.Ok("A Coleta foi Criada mas não foi atribuida a nenhum roteiro, poís o roteiro já atingiu o limite de Coletas!!!");
                    }                                                      
                }
                else
                {                 
                    coleta.RoteiroColetaId = null;
                    _context.Add(coleta);
                    _context.SaveChanges();

                    return Result.Ok("A Coleta foi Criada mas não foi atribuida a nenhum roteiro!!!");
                }
            }
            catch (Exception)
            {
                return Result.Fail("Falha ao cadastrar coleta");
            }
            
        }

        public int ConsultaDisponibilidadeRoteiroDeColeta(DateTime data)
        {
            List<RoteiroDeColetas> lista = _context.RoteiroDeColetas.ToList();
            if (lista.Count > 0)
            {
                var roteiro = lista.Find(r => r.DataCadastro.ToUniversalTime().Date == data && r.Delete == false);
                if (roteiro != null)
                    return roteiro.Id;
                else
                    return 0;
            }
            else
            {
                return 0;
            }
        }

        public bool ConsultaDisponibilidadeColeta(DateTime novaData)
        {          
            List<Coleta> lista = _context.Coletas.Where(x => x.Delete == false && x.DataDeColeta.Date == novaData.Date && x.Cancelada == false).ToList();
            return lista.Any(r => novaData > r.DataDeColeta.AddMinutes(-30) && novaData < r.DataDeColeta.AddMinutes(30));
        }

        public Result UpdateColeta(UpdateColetaDto coletaDto, int id)
        {
            try
            {
                Coleta coleta = _context.Coletas.FirstOrDefault(c => c.Id == id);
                if (coleta != null)
                {
                    _mapper.Map(coletaDto, coleta);
                }
                else
                {
                    return Result.Fail("Não foi possivel salvar o Roteiro de coleta");
                }
                _context.Update(coleta);
                _context.SaveChanges();

                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Não foi possivel salvar o Roteiro de coleta");

            }
        }

        /// <summary>
        /// Insere uma coleta em um roteiro ou cria um roteiro com a data da coleta se o roteiro não existir.
        /// </summary>
        /// <param name="idColeta"></param>
        /// <param name="idRoteiro"></param>
        /// <returns></returns>
        public Result InserirColetaEmRoteiro(int idColeta, int idRoteiro )
        {
            try
            {
                Coleta coleta = _context.Coletas.FirstOrDefault(c => c.Id == idColeta);
                RoteiroDeColetas roteiro = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == idRoteiro);
                if (coleta != null  )
                {
                    if(roteiro != null)
                    {
                        if (roteiro.NumeroMaxColetas <= roteiro.NumeroDeColetas)
                        {
                            coleta.RoteiroColetaId = roteiro.Id;
                            _context.Update(coleta);
                            _context.SaveChanges();
                            return Result.Ok();
                        }
                        else
                            return Result.Fail("O roteriro já atingiu o numero máximo de coletas.");
                    }
                    else
                    {
                        roteiro.DataRoteiro = coleta.DataDeColeta;
                        roteiro.Delete = false;
                        roteiro.NumeroMaxColetas = 10;
                        roteiro.Status = true;
                        roteiro.NumeroDeColetas = 1;
                        roteiro.DataCadastro = DateTime.Now;
                            
                       _context.Add(roteiro);
                        coleta.RoteiroColetaId = roteiro.Id;
                        _context.Update(coleta);
                        _context.SaveChanges();
                        return Result.Ok();
                    }                 
                }
                else
                {
                    return Result.Fail("Não foi possivel salvar o Roteiro de coleta");
                }
                
            }
            catch (Exception)
            {
                return Result.Fail("Não foi possivel salvar o Roteiro de coleta");

            }
        }

        public  ReadColetaDto RecuperaColeta(int id)
        {
            return _mapper.Map<ReadColetaDto>(_context.Coletas.FirstOrDefault(c => c.Id == id));
        }

        public List<dynamic> RecuperaTodasColetas() 
        { 
            return ToJson(_context.Coletas
                .Include(x => x.RoteiroDeColetas)
                .Include(x => x.RoteiroDeColetas.Funcionario)
                .Where(x => x.Delete == false)
                .ToList()
            );
        }

        public PaginationDto<ReadColetaDto> ColetasAberto(string userId, int page = 1, int pageSize = 25)
        {
            int coletasCount = _context.Coletas.Where(x => x.UserId == userId).Count();
            int totalPages = (int)Math.Ceiling((decimal)coletasCount / pageSize);
            var coletas = _context.Coletas.Where(x => x.UserId == userId && x.Status == true).OrderBy(x => x.DataDeColeta).ToList().Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return new PaginationDto<ReadColetaDto>()
            {
                TotalItems = coletasCount,
                PageCount = totalPages,
                PageSize = pageSize,
                PageNumber = page,
                Items = _mapper.Map<List<ReadColetaDto>>(coletas)
            };
        }

        public PaginationDto<ReadColetaDto> ColetasFinalizado(string userId, int page = 1, int pageSize = 25)
        {
            int coletasCount = _context.Coletas.Where(x => x.UserId == userId).Count();
            int totalPages = (int)Math.Ceiling((decimal)coletasCount / pageSize);
            var coletas = _context.Coletas.Where(x => x.UserId == userId && x.Status == false).OrderByDescending(x => x.DataDeColeta).ToList().Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return new PaginationDto<ReadColetaDto>()
            {
                TotalItems = coletasCount,
                PageCount = totalPages,
                PageSize = pageSize,
                PageNumber = page,
                Items = _mapper.Map<List<ReadColetaDto>>(coletas)
            };
        }

        public Result DeletarColeta(int id) 
        {
            try
            {
                Coleta coleta = _context.Coletas.FirstOrDefault(c => c.Id == id);            
                if (coleta != null)
                {
                    coleta.Delete = true;
                    var roteiro = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == coleta.RoteiroColetaId);
                    if (roteiro != null)
                    {
                        roteiro.NumeroDeColetas -= 1;
                        _context.Update(roteiro);
                    }                                
                }
                else
                {
                    return Result.Fail("Não foi possivel salvar o Roteiro de coleta");
                }              
                _context.Update(coleta);
                _context.SaveChanges();

                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Não foi possivel salvar o Roteiro de coleta");

            }
        }

        public Result CancelarColeta(int id)
        {
            try
            {
                Coleta coleta = _context.Coletas.FirstOrDefault(c => c.Id == id);

                if (coleta != null)
                {
                    var roteiro = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == coleta.RoteiroColetaId);
                    coleta.IsSuccess = false;
                    coleta.Status = false;
                    coleta.RoteiroColetaId = null;
                    if (roteiro != null)
                    {
                        roteiro.NumeroDeColetas -= 1;
                        roteiro.Delete = true;
                        _context.Update(roteiro);
                        _context.SaveChanges();
                    }
                }
                else
                {
                    return Result.Fail("Não foi possivel salvar o Roteiro de coleta");
                }
                _context.Update(coleta);
                _context.SaveChanges();

                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Não foi possivel cancelar a coleta");

            }
        }

        public List<object> GetColetasByRoteiroDeColeta(int roteiroDeColetaId)
        {
            return ToJson(
                _context.Coletas
                    .Include(x => x.Usuario)
                    .Include(x => x.Endereco)
                    .Where(x => x.RoteiroColetaId == roteiroDeColetaId)
                    .ToList()
            );
        }

        public List<object>  GetColetasByDateWithoutRoteiroDeColeta(DateTime date)
        {
            return ToJson(_context.Coletas
                .Include(x => x.Usuario)
                .Include(x => x.Endereco)
                .Where(x =>
                    x.DataDeColeta.Date == date.Date &&
                    x.RoteiroColetaId == null &&
                    x.Status == true
                ).ToList()
            );
        }

        public List<object> ToJson(List<Coleta> listaColetas)
        {
            var coletas = new List<object>();
            foreach (var coleta in listaColetas)
            {
                var ListaItensColeta = "";
                var ListaItensColetaArr = coleta.ListaItensColeta.Split(';');

                foreach (var mat in ListaItensColetaArr)
                {
                    try
                    {
                        var matArr = mat.Split(":");
                        var matId = Int32.Parse(matArr[0]);
                        var matPeso = matArr[1];
                        var material = _context.Materiais.Where(x => x.Id == matId).FirstOrDefault();
                        ListaItensColeta += material.Tipo + "(" + matPeso + "), ";
                    }
                    catch (Exception)
                    {
                    }
                }
                if (ListaItensColeta.Length > 0)
                {
                    ListaItensColeta = ListaItensColeta.Substring(0, ListaItensColeta.Length - 2);
                }

                if (coleta.Usuario != null)
                {
                    coletas.Add(new
                    {
                        Id = coleta.Id,
                        RoteiroDeColetaId = coleta.RoteiroColetaId,
                        RoteiroDeColetas = coleta.RoteiroDeColetas,
                        PosicaoLista = coleta.PosicaoLista,
                        ClienteNome = coleta.Usuario.Nome,
                        ClienteCel = coleta.Usuario.Celular,
                        ClienteTel = coleta.Usuario.PhoneNumber,
                        Status = coleta.Status,
                        Cancelada = coleta.Cancelada,
                        Delete = coleta.Delete,
                        LocalidadeExata = coleta.LocalidadeExata,
                        Lat = coleta.Lat,
                        Lon = coleta.Lon,
                        DataCadastro = coleta.DataCadastro,
                        DataDeColeta = coleta.DataDeColeta,
                        Endereco = coleta.Endereco,
                        ListaItensColeta = ListaItensColeta,
                    });
                }
                else
                {
                    coletas.Add(new
                    {
                        Id = coleta.Id,
                        RoteiroDeColetaId = coleta.RoteiroColetaId,
                        RoteiroDeColetas = coleta.RoteiroDeColetas,
                        PosicaoLista = coleta.PosicaoLista,
                        ClienteNome = coleta.ClienteNome,
                        ClienteCel = coleta.ClienteCel,
                        ClienteTel = coleta.ClienteTel,
                        Cancelada = coleta.Cancelada,
                        LocalidadeExata = coleta.LocalidadeExata,
                        Status = coleta.Status,
                        Delete = coleta.Delete,
                        Lat = coleta.Lat,
                        Lon = coleta.Lon,
                        DataCadastro = coleta.DataCadastro,
                        DataDeColeta = coleta.DataDeColeta,
                        Endereco = coleta.Endereco,
                        ListaItensColeta = ListaItensColeta,
                    });
                }
            }
            return coletas;
        }
    }
}
