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
        public IQueryable<Funcionario> GetAll()
        {
            return _context.Funcionarios;
        }

        // Retorna um funcionário com base no ID fornecido
        public Funcionario GetById(int id)
        {
            return _context.Funcionarios.FirstOrDefault(f => f.Id == id);
        }

        // Cria um novo funcionário
        public void Create(Funcionario funcionario)
        {
            // Verifica se já existe um funcionário com o mesmo email
            var existingFuncionario = _context.Funcionarios.FirstOrDefault(f => f.Email == funcionario.Email);
            if (existingFuncionario != null)
            {
                throw new Exception("Já existe um funcionário com o mesmo email.");
            }

            // Trata valores nulos antes de adicionar o funcionário
            funcionario.Matricula = funcionario.Matricula ?? string.Empty;
            funcionario.Email = funcionario.Email ?? string.Empty;
            funcionario.Telefone = funcionario.Telefone ?? string.Empty;
            funcionario.Cargo = funcionario.Cargo ?? string.Empty;

            // Adiciona o novo funcionário ao contexto e salva as alterações
            _context.Funcionarios.Add(funcionario);
            _context.SaveChanges();
        }

        // Atualiza as informações de um funcionário
        public void Update(Funcionario funcionario)
        {
            // Trata valores nulos antes de atualizar o funcionário
            funcionario.Matricula = funcionario.Matricula ?? string.Empty;
            funcionario.Email = funcionario.Email ?? string.Empty;
            funcionario.Telefone = funcionario.Telefone ?? string.Empty;
            funcionario.Cargo = funcionario.Cargo ?? string.Empty;

            // Atualiza o funcionário no contexto e salva as alterações
            _context.Funcionarios.Update(funcionario);
            _context.SaveChanges();
        }

        // Exclui um funcionário com base no ID fornecido
        public void Delete(int id)
        {
            var funcionario = GetById(id);
            if (funcionario != null)
            {
                // Remove o funcionário do contexto e salva as alterações
                _context.Funcionarios.Remove(funcionario);
                _context.SaveChanges();
            }
        }
    }
}