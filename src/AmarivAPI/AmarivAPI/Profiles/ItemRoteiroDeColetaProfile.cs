using AmarivAPI.Data.Dtos.ItensRoteiroDeColetasDtos;
using AmarivAPI.Models;
using AutoMapper;

namespace AmarivAPI.Profiles
{
    public class ItemRoteiroDeColetaProfile : Profile
    {
        public ItemRoteiroDeColetaProfile() 
        {
            CreateMap<CreateItemRoteiroDeColetaDto, ItemRoteiroDeColeta>();
            CreateMap<UpdateItemRoteiroDeColetaDto, ItemRoteiroDeColeta>();
            CreateMap<ItemRoteiroDeColeta, ReadItemRoteiroDeColetaDto>();
        } 
    }
}
