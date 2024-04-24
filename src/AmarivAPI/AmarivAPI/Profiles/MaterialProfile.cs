using AmarivAPI.Data.Dtos;
using AmarivAPI.Data.Dtos.MaterialDtos;
using AmarivAPI.Models;
using AutoMapper;

namespace AmarivAPI.Profiles
{
    public class MaterialProfile: Profile
    {
        public MaterialProfile() {
            CreateMap<CreateMaterialDto, Material>();
            CreateMap<Material, ReadMaterialDto>();
        }
    }
}
