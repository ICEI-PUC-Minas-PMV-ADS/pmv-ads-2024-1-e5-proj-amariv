using AutoMapper;
using FluentResults;
using AmarivAPI.Data.Dtos;
using AmarivAPI.Models;
using AmarivAPI.Data;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http.HttpResults;
using AmarivAPI.Data.Dtos.ColetasDto;
using System.Reflection.Metadata.Ecma335;


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
       
        public Result<string> SalvarColeta(CreateColetaDto dto, string funcionarioId)
        {
            RoteiroDeColetas roteiro;
            DateTime dataColeta;
          
            try
            {
                Coleta coleta = _mapper.Map<Coleta>(dto);
                dataColeta = coleta.DataDeColeta;

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
                    roteiro = new RoteiroDeColetas();
                    roteiro.FuncionarioId = funcionarioId;
                    roteiro.DataCadastro = DateTime.Now;
                    roteiro.Status = true;
                    roteiro.DataRoteiro = dataColeta;
                    roteiro.Delete = false;
                    roteiro.NumeroDeColetas = 1;
                    roteiro.NumeroMaxColetas = 10;
                    _context.RoteiroDeColetas.Add(roteiro);
                    _context.SaveChanges();
                        
                    coleta.UserId = funcionarioId;
                    coleta.RoteiroColetaId = roteiro.Id;
                    _context.Add(coleta);
                    _context.SaveChanges();

                    return Result.Ok("A Coleta e o Roteiro foram criados com sucesso!!");
                }
            }
            catch (Exception)
            {
                return Result.Fail("Falha ao cadastrar coleta");
            }
            
        }

        public int ConsultaDisponibilidadeRoteiroDeColeta(DateTime data)
        {
            var roteiro = (from c in _context.RoteiroDeColetas where c.DataRoteiro == data select c).FirstOrDefault();
            
            if (roteiro != null)
            {                      
                    return roteiro.Id;          
            }
            else
            {
                return 0;
            }
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

        public List<ReadColetaDto> RecuperaTodasColetas() 
        { 
            var lista = _context.Coletas.ToList();
            if (lista.Count == 0)
            {
                return null;
            }else
            {
                return _mapper.Map<List<ReadColetaDto>>(lista);
            }
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


    }
}
