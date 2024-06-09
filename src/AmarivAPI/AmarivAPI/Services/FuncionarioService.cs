using System;
using System.Linq;
using AmarivAPI.Data;
using AmarivAPI.Models;

namespace AmarivAPI.Services
{
    public class FuncionarioService
    {
        private readonly AmarivContext _context;

        public FuncionarioService(AmarivContext context)
        {
            _context = context;
        }

        // Retorna todos os funcionários existentes
        public IQueryable<Usuario> GetAll()
        {
            return _context.Users.Where(x => x.Id != "adm");
        }

        // Retorna um funcionário com base no ID fornecido
        public Usuario GetById(string id)
        {
            return _context.Users.FirstOrDefault(f => f.Id == id);
        }

        // Cria um novo funcionário
        public void Create(Usuario funcionario)
        {
            // Verifica se já existe um funcionário com o mesmo email
            var existingFuncionario = _context.Users.FirstOrDefault(f => f.Email == funcionario.Email);
            if (existingFuncionario != null)
            {
                throw new Exception("Já existe um funcionário com o mesmo email.");
            }

            // Adiciona o novo funcionário ao contexto e salva as alterações
            _context.Users.Add(funcionario);
            _context.SaveChanges();
        }

        // Atualiza as informações de um funcionário
        public void Update(Usuario funcionario)
        {
            // Atualiza o funcionário no contexto e salva as alterações
            _context.Users.Update(funcionario);
            _context.SaveChanges();
        }

        // Exclui um funcionário com base no ID fornecido
        public void Delete(string id)
        {
            var funcionario = GetById(id);
            if (funcionario != null)
            {
                // Remove o funcionário do contexto e salva as alterações
                _context.Users.Remove(funcionario);
                _context.SaveChanges();
            }
        }
    }
}