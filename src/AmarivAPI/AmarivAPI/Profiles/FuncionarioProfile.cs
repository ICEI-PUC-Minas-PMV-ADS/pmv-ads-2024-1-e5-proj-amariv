﻿using AmarivAPI.DTOs.FuncionarioDtos;
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
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso))
                .ForMember(dest => dest.Senha, opt => opt.MapFrom(src => src.Senha))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone));

            // Mapeia os dados de Funcionario para FuncionarioDto
            CreateMap<Funcionario, FuncionarioDto>()
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso))
                .ForMember(dest => dest.Senha, opt => opt.MapFrom(src => src.Senha))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone));

            // Mapeia os dados de Funcionario para FuncionarioResponseDto
            CreateMap<Funcionario, FuncionarioResponseDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Sexo, opt => opt.MapFrom(src => src.Sexo))
                .ForMember(dest => dest.SuportaPeso, opt => opt.MapFrom(src => src.SuportaPeso))
                .ForMember(dest => dest.Cargo, opt => opt.MapFrom(src => src.Cargo))
                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src => src.Telefone));
        }
    }
}