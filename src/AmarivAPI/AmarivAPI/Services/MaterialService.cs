using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AmarivAPI.Services
{
    public class MaterialService
    {
        private readonly IMapper _mapper;
        private readonly AmarivContext _context;

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
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result.Fail("Falha ao criar material");
            }
        }

        public Result UpdateMaterial(CreateMaterialDto materialDto, int id_material)
        {
            try
            {
                Material material = _context.Materiais.FirstOrDefault(m => m.Id == id_material);

                if (material != null)
                {
                    _mapper.Map(materialDto, material);
                    _context.Update(material);
                    _context.SaveChanges();
                    return Result.Ok();
                }
                else
                {
                    return Result.Fail("Não foi possível encontrar o Material!!!");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result.Fail("Erro ao atualizar o material cadastrado.");
            }
        }

        public ReadMaterialDto RecuperaMaterial(int id_material)
        {
            Material material = _context.Materiais.FirstOrDefault(m => m.Id == id_material);
            return _mapper.Map<ReadMaterialDto>(material);
        }

        public Result DeletaMaterial(int id_material)
        {
            if(id_material == 1 || id_material == 2 || id_material == 3 || id_material == 4)
            {
                return Result.Fail("Não e possivel excluir os materiais basicos!");
            }
            try
            {
                Material material = _context.Materiais.FirstOrDefault(m => m.Id == id_material);

                if (material != null)
                {
                    material.Delete = true;
                    _context.Update(material);
                    _context.SaveChanges();
                    return Result.Ok();
                }
                else
                {
                    return Result.Fail("Não foi possível encontrar o Material!!!");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return Result.Fail("Erro ao excluir o material cadastrado.");
            }
        }

        public List<ReadMaterialDto> RecuperarTodosMateriais()
        {
            try
            {
                List<Material> materiais = _context.Materiais.Where(x => x.Delete == false).ToList();

                if (materiais.Count == 0)
                {
                    return null;
                }

                return _mapper.Map<List<ReadMaterialDto>>(materiais);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
