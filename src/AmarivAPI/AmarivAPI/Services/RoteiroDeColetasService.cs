using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.EmployeeAPI.Data.DTOs;
using AmarivAPI.EmployeeAPI.Mappers;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace AmarivAPI.Services
{
    public class RoteiroDeColetasService
    {
        public IMapper _mapper;
        public AmarivContext _context { get; set; }

        public RoteiroDeColetasService(IMapper mapper, AmarivContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public List<RoteiroDeColetas> GetValidRoteiroDeColetas()
        {
            return _context.RoteiroDeColetas
                .Where(x => x.DataRoteiro.Date >= DateTime.Now.Date)
                .ToList();
        }

        public bool GetRoteiroDeColetaByDate(DateTime dataRoteiro)
        {
            return _context.RoteiroDeColetas
                .Where(x => x.DataRoteiro.Date == dataRoteiro.Date)
                .Any();
        }

        public RoteiroDeColetas SaveRoteiroDeColeta(SaveRoteiroDeColetaDto dto)
        {
            var t = _context.Database.BeginTransaction();
            try
            {
                RoteiroDeColetas? ro = _context.RoteiroDeColetas.Where(x => x.Id == dto.RoteiroDeColetaId).FirstOrDefault();
                if (ro == null)
                {
                    throw new Exception("Falha ao recuperar roteiro de coleta!");
                }
                if (ro.NumeroDeColetas > dto.MaxNumColeta)
                {
                    throw new Exception("Não foi possivel alterar o numero maximo de coletas, pois, entra em conflito com as coletas existentes!");
                }

                ro.NumeroMaxColetas = dto.MaxNumColeta;
                ro.DataRoteiro = dto.DataRoteiro;
                ro.FuncionarioId = dto.FuncionarioId;

                _context.RoteiroDeColetas.Entry(ro).CurrentValues.SetValues(ro);
                _context.SaveChanges();

                t.Commit();

                return ro;
            }
            catch (Exception)
            {
                throw new Exception("Falha ao criar roteiro de coleta!");
            }
        }

        public RoteiroDeColetas CreateRoteiroDeColeta(CriarRoteiroDeColetaDto dto)
        {
            var t = _context.Database.BeginTransaction();
            try
            {
                RoteiroDeColetas ro = new RoteiroDeColetas();

                ro.FuncionarioId = dto.FuncionarioId;
                ro.Delete = false;
                ro.Status = true;
                ro.NumeroDeColetas = 0;
                ro.NumeroMaxColetas = dto.MaxNumColeta;
                ro.DataRoteiro = dto.DataRoteiro;

                _context.RoteiroDeColetas.Add(ro);
                _context.SaveChanges();

                t.Commit();

                return ro;
            }
            catch(Exception)
            {
                throw new Exception("Falha ao criar roteiro de coleta!");
            }
        }


        public Result SalvarRoteiroDeColeta(CreateRoteiroDeColetasDto RoteiroDto)
        {
            try
            {
                RoteiroDeColetas RoteiroDeColeta = _mapper.Map<RoteiroDeColetas>(RoteiroDto);
                if (ConsultaDisponibilidadeRoteiroDeColeta(RoteiroDeColeta))
                {
                    return Result.Fail("Já existe um roteiro com essa data cadastrada.");
                }
                else
                {
                    _context.RoteiroDeColetas.Add(RoteiroDeColeta);
                    _context.SaveChanges();
                    return Result.Ok();
                }
            }
            catch (Exception)
            {
                return Result.Fail("Falha ao criar Roteiro de Coleta");
            }
        }

        public bool ConsultaDisponibilidadeRoteiroDeColeta(RoteiroDeColetas roteiro)
        {
            List<RoteiroDeColetas> lista = _context.RoteiroDeColetas.ToList();
            return lista.Any(r => r.DataCadastro.Date == roteiro.DataCadastro.Date && r.Delete == false);
        }

        #region Updates_RoteiroDeColetas

        /// <summary>
        /// Update padrão do roteiro de coletas.
        /// </summary>
        /// <param name="RoteiroDto"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public Result UpdateRoteiroDeColeta(UpdateRoteiroDeColetasDto RoteiroDto, int id)
        {
            try
            {
                RoteiroDeColetas RoteiroDeColeta = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == id);
                if (RoteiroDeColeta != null)
                    _mapper.Map(RoteiroDeColeta, RoteiroDto);
                else
                    return Result.Fail("Não foi possivel encontrar o Roteiro de coleta");

                _context.Update<RoteiroDeColetas>(RoteiroDeColeta);
                _context.SaveChanges();

                return Result.Ok();

            }
            catch (Exception)
            {
                return Result.Fail("Falha ao criar Roteiro de Coleta");
            }
        }

         /// <summary>
         ///  Função para substituir o número máximo de coletas do roteiro.
         /// </summary>
         /// <param name="numeroDeColetas"></param>
         /// <param name="id"></param>
         /// <returns></returns>
        public Result UpdateRoteiroDeColeta(int numeroDeColetas, int id)
        {
            try
            {
                RoteiroDeColetas roteiroDeColeta = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == id);
                if (roteiroDeColeta != null)
                    roteiroDeColeta.NumeroMaxColetas = numeroDeColetas;
                else
                    return Result.Fail("Não foi possivel encontrar o Roteiro de coleta");

                _context.Update<RoteiroDeColetas>(roteiroDeColeta);
                _context.SaveChanges();

                return Result.Ok();

            }
            catch (Exception)
            {
                return Result.Fail("Falha ao criar Roteiro de Coleta");
            }
        }

        /// <summary>
        /// Adiciona uma coleta no numero de coletas atuais do Roteiro.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Result UpdateRoteiroDeColeta(int id)
        {
            try
            {
                RoteiroDeColetas roteiroDeColeta = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == id);
                if (roteiroDeColeta != null)
                {
                    if (roteiroDeColeta.NumeroMaxColetas <= roteiroDeColeta.NumeroDeColetas)
                        return Result.Fail("O numero máximo de coletas para a data já foi atingido!!");
                    else
                        roteiroDeColeta.NumeroDeColetas += 1;
                }
                else
                {
                    return Result.Fail("Não foi possivel encontrar o Roteiro de coleta");
                }

                _context.Update<RoteiroDeColetas>(roteiroDeColeta);
                _context.SaveChanges();
                return Result.Ok();

            }
            catch (Exception)
            {
                return Result.Fail("Falha ao criar Roteiro de Coleta");
            }
        }

        #endregion

        public ReadRoteiroDeColetasDto RecuperaRoteiroDeColetas(int id)
        {
            var roteiroDeColeta = _context.RoteiroDeColetas
                .Include(x => x.Funcionario)
                .Where(x => x.Id == id)
                .FirstOrDefault();
            return _mapper.Map<ReadRoteiroDeColetasDto>(roteiroDeColeta);
        }

        public List<ReadRoteiroDeColetasDto> RecuperaTodosRoteiroColetas()
        {
            var lista = _context.RoteiroDeColetas.ToList();
            if (lista.Count == 0)
            {
                return null;
            }
            else
            {
                return _mapper.Map<List<ReadRoteiroDeColetasDto>>(lista);
            }
        }

        public Result DeletaRoteiroDeColetas(int id)
        {
            try
            {
                RoteiroDeColetas roteiro = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == id);
                roteiro.Delete = true;
                _context.SaveChanges();
                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Não foi possivel localizar o Roteiro de coletas");
            }
        }
        
        /// <summary>
        /// Função para conferir se o roteiro está disponivel para 
        /// </summary>
        /// <param name="dataRoteiro"></param>
        /// <returns></returns>
        public bool ChecaDisponibilidadeDoRoteiro(DateTime dataRoteiro)
        {
            var roteiro = _context.RoteiroDeColetas.FirstOrDefault(c => c.DataRoteiro == dataRoteiro && c.Delete == false);
            if (roteiro != null)
                return roteiro.NumeroMaxColetas > roteiro.NumeroDeColetas;
            else
                return true;                         
        }

        public object OrdenaRoteiroDeColeta(OrdenaRoteiroDeColetasDto dto)
        {
            try
            {
                var gatheringItinerary = _context.RoteiroDeColetas.Where(x => x.Id == dto.Id).FirstOrDefault();
                if (gatheringItinerary == null)
                {
                    throw new Exception("Falha ao recuperar roteiro de coleta.");
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
                    throw new Exception("Falha ao recuperar registro de coletas.");
                }
                using (var t = _context.Database.BeginTransaction())
                {
                    for (int i = 0; i < affectedRoutesList.Count; i++)
                    {
                        var coletaId = affectedRoutesList.ElementAt(i);
                        var coleta = coletas.Where(x => x.Id == coletaId).FirstOrDefault();
                        if (coleta == null)
                        {
                            throw new Exception("Falha ao recuperar registro de coletas");
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

                        _context.Coletas.Entry(coleta).CurrentValues.SetValues(coleta);
                        _context.SaveChanges();
                    }
                    t.Commit();
                }
                return ToJson(coletas);
            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao recuperar registro de coletas");
            }
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
                        PosicaoLista = coleta.PosicaoLista,
                        ClienteNome = coleta.Usuario.Nome,
                        ClienteCel = coleta.Usuario.Celular,
                        ClienteTel = coleta.Usuario.PhoneNumber,
                        Status = coleta.Status,
                        Delete = coleta.Delete,
                        Cancelada = coleta.Cancelada,
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
                        PosicaoLista = coleta.PosicaoLista,
                        ClienteNome = coleta.ClienteNome,
                        ClienteCel = coleta.ClienteCel,
                        ClienteTel = coleta.ClienteTel,
                        Status = coleta.Status,
                        Delete = coleta.Delete,
                        Cancelada = coleta.Cancelada,
                        LocalidadeExata = coleta.LocalidadeExata,
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