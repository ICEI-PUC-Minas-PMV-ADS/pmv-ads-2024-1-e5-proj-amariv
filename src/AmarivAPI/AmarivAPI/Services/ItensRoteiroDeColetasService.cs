
using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.ItensRoteiroDeColetasDtos;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;


namespace AmarivAPI.Services
{
    public class ItensRoteiroDeColetasService
    {
        public IMapper _mapper { get; set; }
        public AmarivContext _context { get; set; }

        public ItensRoteiroDeColetasService(IMapper mapper, AmarivContext context)
        {
            _mapper = mapper;
            _context = context;
        }


        public Result SalvarItensRoteiroDeColeta(CreateItemRoteiroDeColetaDto ItemDto)
        {
            try
            {
                ItemRoteiroDeColeta itemRoteiro = _mapper.Map<ItemRoteiroDeColeta>(ItemDto);
                _context.ItensRoteiroDeColetas.Add(itemRoteiro);
                _context.SaveChanges();
                return Result.Ok();

            }
            catch (Exception)
            {
                return Result.Fail("Não Foi possivel salvar o Item do roteiro ");
            }
        }

        public Result UpdateItensRoteiroDeColeta(UpdateItemRoteiroDeColetaDto ItemDto, int id)
        {
            ItemRoteiroDeColeta itemRoteiro = _context.ItensRoteiroDeColetas.FirstOrDefault(x => x.Id == id);
            if (itemRoteiro != null)
                _mapper.Map(itemRoteiro, ItemDto);
            else
                return Result.Fail("Não Foi possivel salvar o item do roteiro da coleta!");

            _context.Update<ItemRoteiroDeColeta>(itemRoteiro);
            _context.SaveChanges();

            return Result.Ok();
        }

        public ReadItemRoteiroDeColetaDto RecuperaItensRoteiroDeColeta(int id)
        {
            return _mapper.Map<ReadItemRoteiroDeColetaDto>(_context.ItensRoteiroDeColetas.FirstOrDefault(r => r.Id == id));
        }

        public List<ReadItemRoteiroDeColetaDto> RecuperaTodosItensRoteiroDeColeta()
        {
            var lista = _context.ItensRoteiroDeColetas.ToList();
            if (lista.Count == 0)
                return null;
            else
                return _mapper.Map<List<ReadItemRoteiroDeColetaDto>>(lista);

        }

        public Result DeletaItemRoteiroDeColeta(int id)
        {
            try
            {
                ItemRoteiroDeColeta roteiro = _context.ItensRoteiroDeColetas.FirstOrDefault(r => r.Id == id);
                _context.Remove<ItemRoteiroDeColeta>(roteiro);
                _context.SaveChanges();
                return Result.Ok();
            }
            catch (Exception)
            {
                return Result.Fail("Não foi possivel localizar o item do Roteiro de coletas");
            }
        }

    }
}