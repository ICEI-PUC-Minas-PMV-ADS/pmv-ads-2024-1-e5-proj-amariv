using AmarivAPI.Data;
using AmarivAPI.Models;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace AmarivAPI.EmployeeAPI.Mappers
{
    public class RoteiroDeColetaMapper
    {
        private AmarivContext _context;
        private RoteiroDeColetas _roteiroDeColetas;
        public RoteiroDeColetaMapper(AmarivContext context, RoteiroDeColetas roteiroDeColetas) {
            _context = context;
            _roteiroDeColetas = roteiroDeColetas;
        }

        public object ToJson()
        {
            var coletas = new List<object>();
            foreach (var coleta in _roteiroDeColetas.Coletas)
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
                        Lat = coleta.Lat,
                        Lon = coleta.Lon,
                        DataCadastro = coleta.DataCadastro,
                        DataDeColeta = coleta.DataDeColeta,
                        Endereco = coleta.Endereco,
                        ListaItensColeta = ListaItensColeta,
                    });
                }
            }

            return new {
                Id = _roteiroDeColetas.Id,
                DataRoteiro = _roteiroDeColetas.DataRoteiro,
                DataCadastro = _roteiroDeColetas.DataCadastro,
                Status = _roteiroDeColetas.Status,
                NumeroDeColetas = _roteiroDeColetas.NumeroDeColetas,
                NumeroMaxColetas = _roteiroDeColetas.NumeroMaxColetas,
                Funcionario = _roteiroDeColetas.Funcionario,
                Coletas = coletas.ToArray(),
            };
        }
    }
}
