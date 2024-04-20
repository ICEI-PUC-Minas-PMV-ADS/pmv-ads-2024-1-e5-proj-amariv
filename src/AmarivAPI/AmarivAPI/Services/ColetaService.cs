using AutoMapper;
using FluentResults;
using AmarivAPI.Data.Dtos;
using AmarivAPI.Models;

namespace AmarivAPI.Services
{
    public class ColetaService
    {
        public IMapper _mapper;

        public ColetaService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public Result CadastraColeta(CreateColetaDto dto)
        {
            Coleta coleta = _mapper.Map<Coleta>(dto);
            return Result.Fail("Falha ao cadastrar coleta");
        }
    }
}
