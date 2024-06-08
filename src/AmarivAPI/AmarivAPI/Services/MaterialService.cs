﻿using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;


namespace AmarivAPI.Services
{
    public class MaterialService
    {
        public IMapper _mapper;
        public AmarivContext _context;

        public MaterialService(IMapper mapper, AmarivContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public Result SalvarMaterial(CreateMaterialDto materialDto)
        {
            try
            {
                Material material = _mapper.Map<Material>(materialDto);
                _context.Materiais.Add(material);
                _context.SaveChanges();

                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Falha ao criar material");
            }
        }

        public Result UpdateMaterial(CreateMaterialDto materialDto, int id_material)
        {
            try
            {

                Material material = _context.Materiais.FirstOrDefault(m => m.Id == id_material);
                if (material != null)
                    _mapper.Map(materialDto,material);
                else
                    return Result.Fail("Não Foi possivel encontrar o Material!!!");

                _context.Update<Material>(material);
                _context.SaveChanges();
                return Result.Ok();

            }
            catch (Exception)
            {

                return Result.Fail("Erro ao Atualizar o material cadastrado.");
            }
        }

        public ReadMaterialDto RecuperaMaterial(int id_material)
        {
            return _mapper.Map<ReadMaterialDto>(_context.Materiais.FirstOrDefault(m => m.Id == id_material));
        }

        public Result DeletaMaterial(int id_material)
        {
            try
            {
                Material material = _context.Materiais.FirstOrDefault(m => m.Id == id_material);
                _context.Remove(material);
                _context.SaveChanges();

                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Erro ao Excluir Material!");

            }

        }

        public List<ReadMaterialDto> RecuperarTodosMateriais()
        {
            try
            {
                var materiaisDB = _context.Materiais.ToList();
                List<ReadMaterialDto> materiais = _mapper.Map<List<ReadMaterialDto>>(materiaisDB);
                if (materiais == null)
                    return null;

                return materiais;
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
                return null;
            }
        }


    }
}