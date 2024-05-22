using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.EnderecoDto;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;

namespace AmarivAPI.Services
{
    public class EnderecoService
    {
        public IMapper _mapper;
        public AmarivContext _context;

        public EnderecoService(IMapper mapper, AmarivContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public Result SalvarEndereco(CreateEnderecoDto enderecoDto)
        {
            try
            {
                Endereco endereco = _mapper.Map<Endereco>(enderecoDto);
                _context.Enderecos.Add(endereco);
                _context.SaveChanges();

                return Result.Ok().WithSuccess(endereco.Id.ToString());
            }
            catch (Exception)
            {
                return Result.Fail("Falha ao criar material");
            }
        }

        public Result UpdateEndereco(UpdateEnderecoDto enderecoDto, int id)
        {
            try
            {

                Endereco endereco = _context.Enderecos.FirstOrDefault(m => m.Id == id);
                if (endereco != null)
                    _mapper.Map(enderecoDto, endereco);
                else
                    return Result.Fail("Não Foi possivel encontrar o endereço!!!");

                _context.Update<Endereco>(endereco);
                _context.SaveChanges();
                return Result.Ok();

            }
            catch (Exception)
            {

                return Result.Fail("Erro ao Atualizar o endereço cadastrado.");
            }
        }

        public ReadEnderecoDto RecuperaEndereco(int id)
        {
            return _mapper.Map<ReadEnderecoDto>(_context.Enderecos.FirstOrDefault(m => m.Id == id));
        }


    }
}
