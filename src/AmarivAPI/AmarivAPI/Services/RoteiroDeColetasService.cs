using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;

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
            return _mapper.Map<ReadRoteiroDeColetasDto>(_context.RoteiroDeColetas.FirstOrDefault(r => r.Id == id));
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
    }
}