using AmarivAPI.Data;
using AmarivAPI.Models;

namespace AmarivAPI.Services
{
    public class ListaColetasService
    {
        private AmarivContext _context;

        public ListaColetasService(AmarivContext context)
        {
            _context = context;
        }

        public List<dynamic> GetAll()
        {
            var coletas = _context.Coletas.Where(x => x.Status == false && x.IsSuccess == false && x.Cancelada == false && x.Delete == false).ToList();
            return ToJson(coletas);
        }

        public List<dynamic> AprovarColeta(int coletaId)
        {
            var coleta = _context.Coletas.Where(x => x.Id == coletaId).FirstOrDefault();
            if (coleta == null)
            {
                throw new Exception("Falha ao recuperar coleta.");
            }
            coleta.Status = true;

            try
            {
                _context.Coletas.Entry(coleta).CurrentValues.SetValues(coleta);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao atualizar coleta.");
            }
            var coletas = _context.Coletas.Where(x => x.Status == false && x.IsSuccess == false && x.Cancelada == false && x.Delete == false).ToList();
            return ToJson(coletas);
        }

        public List<dynamic> RecusarColeta(int coletaId)
        {
            var coleta = _context.Coletas.Where(x => x.Id == coletaId).FirstOrDefault();
            if (coleta == null)
            {
                throw new Exception("Falha ao recuperar coleta.");
            }
            coleta.Status = false;
            coleta.Cancelada = true;

            try
            {
                _context.Coletas.Entry(coleta).CurrentValues.SetValues(coleta);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Falha ao atualizar coleta.");
            }
            var coletas = _context.Coletas.Where(x => x.Status == false && x.IsSuccess == false && x.Cancelada == false && x.Delete == false).ToList();
            return ToJson(coletas);
        }

        public List<object> ToJson(List<Coleta> listaColetas)
        {
            var coletas = new List<object>();
            foreach (var coleta in listaColetas)
            {
                var ListaItensColeta = "";
                var ListaItensColetaArr = coleta.ListaItensColeta.Split(';');

                foreach (var mat in ListaItensColetaArr)
                {
                    try
                    {
                        var matArr = mat.Split(":");
                        var matId = Int32.Parse(matArr[0]);
                        var matPeso = matArr[1];
                        var material = _context.Materiais.Where(x => x.Id == matId).FirstOrDefault();
                        ListaItensColeta += material.Tipo + "(" + matPeso + "), ";
                    }
                    catch (Exception)
                    {
                    }
                }
                if (ListaItensColeta.Length > 0)
                {
                    ListaItensColeta = ListaItensColeta.Substring(0, ListaItensColeta.Length - 2);
                }

                if (coleta.Usuario != null)
                {
                    coletas.Add(new
                    {
                        Id = coleta.Id,
                        PosicaoLista = coleta.PosicaoLista,
                        ClienteNome = coleta.Usuario.Nome,
                        ClienteCel = coleta.Usuario.Celular,
                        ClienteTel = coleta.Usuario.PhoneNumber,
                        Status = coleta.Status,
                        Delete = coleta.Delete,
                        Cancelada = coleta.Cancelada,
                        LocalidadeExata = coleta.LocalidadeExata,
                        Lat = coleta.Lat,
                        Lon = coleta.Lon,
                        DataCadastro = coleta.DataCadastro,
                        DataDeColeta = coleta.DataDeColeta,
                        Endereco = coleta.Endereco,
                        ListaItensColeta = ListaItensColeta,
                    });
                }
                else
                {
                    coletas.Add(new
                    {
                        Id = coleta.Id,
                        PosicaoLista = coleta.PosicaoLista,
                        ClienteNome = coleta.ClienteNome,
                        ClienteCel = coleta.ClienteCel,
                        ClienteTel = coleta.ClienteTel,
                        Status = coleta.Status,
                        Delete = coleta.Delete,
                        Cancelada = coleta.Cancelada,
                        LocalidadeExata = coleta.LocalidadeExata,
                        Lat = coleta.Lat,
                        Lon = coleta.Lon,
                        DataCadastro = coleta.DataCadastro,
                        DataDeColeta = coleta.DataDeColeta,
                        Endereco = coleta.Endereco,
                        ListaItensColeta = ListaItensColeta,
                    });
                }
            }
            return coletas;
        }
    }
}
