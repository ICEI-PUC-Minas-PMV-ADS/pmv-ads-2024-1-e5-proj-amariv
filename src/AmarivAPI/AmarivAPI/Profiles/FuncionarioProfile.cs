using AmarivAPI.DTOs.FuncionarioDtos;
using AmarivAPI.Models;
using AutoMapper;

namespace AmarivAPI.Profiles
{
    public class FuncionarioProfile : Profile
    {
        public FuncionarioProfile()
        {
            // Mapeia os dados de FuncionarioDto para Funcionario
            CreateMap<FuncionarioDto, Usuario>()
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone));

            // Mapeia os dados de Funcionario para FuncionarioDto
            CreateMap<Usuario, FuncionarioDto>()
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone));

            // Mapeia os dados de Funcionario para FuncionarioResponseDto
            CreateMap<Usuario, FuncionarioResponseDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone));

            // Mapeia os dados de FuncionarioUpdateDto para Funcionario
            CreateMap<FuncionarioUpdateDto, Usuario>()
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo));
        }
    }
}