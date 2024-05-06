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
            CreateMap<FuncionarioDto, Funcionario>()
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Matricula, opt => opt.MapFrom(src => src.Matricula))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Cpf, opt => opt.MapFrom(src => src.Cpf))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.DataAdmissao, opt => opt.MapFrom(src => src.DataAdmissao))
                .ForMember(dest => dest.DataNascimento, opt => opt.MapFrom(src => src.DataNascimento))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.Senha, opt => opt.MapFrom(src => src.Senha))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso));

            // Mapeia os dados de Funcionario para FuncionarioDto
            CreateMap<Funcionario, FuncionarioDto>()
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Matricula, opt => opt.MapFrom(src => src.Matricula))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Cpf, opt => opt.MapFrom(src => src.Cpf))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.DataAdmissao, opt => opt.MapFrom(src => src.DataAdmissao))
                .ForMember(dest => dest.DataNascimento, opt => opt.MapFrom(src => src.DataNascimento))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.Senha, opt => opt.MapFrom(src => src.Senha))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso));

            // Mapeia os dados de Funcionario para FuncionarioResponseDto
            CreateMap<Funcionario, FuncionarioResponseDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Matricula, opt => opt.MapFrom(src => src.Matricula))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Cpf, opt => opt.MapFrom(src => src.Cpf))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.DataAdmissao, opt => opt.MapFrom(src => src.DataAdmissao))
                .ForMember(dest => dest.DataNascimento, opt => opt.MapFrom(src => src.DataNascimento))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso));
        }
    }
}