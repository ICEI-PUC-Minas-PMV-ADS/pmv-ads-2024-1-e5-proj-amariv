﻿using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;
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
                _context.RoteiroDeColetas.Add(RoteiroDeColeta);
                _context.SaveChanges();
                return Result.Ok();

            }
            catch (Exception)
            {
                return Result.Fail("Falha ao criar Roteiro de Coleta");
            }
        }

        public Result UpdateRoteiroDeColeta(UpdateRoteiroDeColetasDto RoteiroDto, int id)
        {
            try
            {
                RoteiroDeColetas RoteiroDeColeta = _context.RoteiroDeColetas.FirstOrDefault(r => r.Id == id);
                if (RoteiroDeColeta != null)
                    _mapper.Map(RoteiroDeColeta, RoteiroDto);
                else
                    return Result.Fail("Não foi possivel encntrar o Roteiro de coleta");

                _context.Update<RoteiroDeColetas>(RoteiroDeColeta);
                _context.SaveChanges();

                return Result.Ok();

            }
            catch (Exception)
            {
                return Result.Fail("Falha ao criar Roteiro de Coleta");
            }
        }

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
                roteiro.IsDelete = true;
                _context.SaveChanges();
                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Não foi possivel localizar o Roteiro de coletas");
            }
        }



    }
}