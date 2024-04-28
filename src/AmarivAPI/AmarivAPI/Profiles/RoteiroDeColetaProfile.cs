using AmarivAPI.Data.Dtos.RoteiroDeColetasDtos;
using AmarivAPI.Models;
using AutoMapper;

namespace AmarivAPI.Profiles
{
    public class RoteiroDeColetaProfile: Profile
    {
       public RoteiroDeColetaProfile() 
        {
            CreateMap<CreateRoteiroDeColetasDto, RoteiroDeColetas>();
            CreateMap<UpdateRoteiroDeColetasDto, RoteiroDeColetas>();
            CreateMap<RoteiroDeColetas, ReadRoteiroDeColetasDto>();
        }
    }
}
