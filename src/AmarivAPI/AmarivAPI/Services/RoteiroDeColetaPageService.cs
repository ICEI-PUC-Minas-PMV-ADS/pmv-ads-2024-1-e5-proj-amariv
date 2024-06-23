#nullable enable

using AmarivAPI.Data;
using AmarivAPI.Models;

namespace AmarivAPI.Services
{
    public class RoteiroDeColetaPageService
    {
        public AmarivContext _context { get; set; }

        public RoteiroDeColetaPageService(AmarivContext context)
        {
            _context = context;
        }

        public Coleta? GetColeta(int Id)
        {
            return _context.Coletas.Where(x => x.Id == Id).FirstOrDefault();
        }
        public bool HasRoteiroDeColetaByDate(DateTime startDate, DateTime endDate)
        {
            return _context.RoteiroDeColetas
                .Where(x => x.DataRoteiro >= startDate && x.DataRoteiro <= endDate)
                .Any();
        }

        public bool HasRoteiroDeColetaByDate(int roteiroDeColetaId, DateTime startDate, DateTime endDate)
        {
            return _context.RoteiroDeColetas
                .Where(x => x.DataRoteiro >= startDate && x.DataRoteiro <= endDate && x.Id != roteiroDeColetaId)
                .Any();
        }

        public RoteiroDeColetas? GetRoteiroDeColeta(int roteiroDeColetaId)
        {
            return _context.RoteiroDeColetas.Where(x => x.Id == roteiroDeColetaId).FirstOrDefault();
        }

        public List<Coleta> GetColetasByRoteiroDeColeta(int RoteiroDeColetaId)
        {
            return _context.Coletas.Where(x => x.RoteiroColetaId == RoteiroDeColetaId).ToList();
        }

        public RoteiroDeColetas? RecuperaRoteiroDeColetas(int RoteiroDeColetaId)
        {
            return _context.RoteiroDeColetas.Where(x => x.Id == RoteiroDeColetaId).FirstOrDefault();
        }

        public void SaveColeta(Coleta coleta)
        {
            _context.Coletas.Entry(coleta).CurrentValues.SetValues(coleta);
            _context.SaveChanges();
        }

        public void SaveRoteiroDeColeta(RoteiroDeColetas roteiroDeColetas)
        {
            _context.RoteiroDeColetas.Entry(roteiroDeColetas).CurrentValues.SetValues(roteiroDeColetas);
            _context.SaveChanges();
        }

        public void CancelarColeta(int coletaId)
        {
            var coleta = _context.Coletas.Where(x => x.Id == coletaId).FirstOrDefault();
            if (coleta == null)
            {
                throw new Exception("");
            }
            coleta.Cancelada = true;

            _context.Coletas.Entry(coleta).CurrentValues.SetValues(coleta);
            _context.SaveChanges();
        }
    }
}
