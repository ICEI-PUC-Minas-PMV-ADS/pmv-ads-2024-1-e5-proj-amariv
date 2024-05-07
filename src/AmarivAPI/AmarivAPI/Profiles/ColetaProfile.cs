using AmarivAPI.Data.Dtos.ColetasDto;
using AmarivAPI.Models;
using AutoMapper;

namespace AmarivAPI.Profiles
{
    public class ColetaProfile : Profile
    {
        public ColetaProfile() 
        {
            CreateMap<CreateColetaDto,Coleta>()
                .ForMember(dest => dest.Delete, opt => opt.MapFrom(src => false));
            CreateMap<Coleta, ReadColetaDto>();
            CreateMap<UpdateColetaDto, Coleta>();

        }
    }
}
