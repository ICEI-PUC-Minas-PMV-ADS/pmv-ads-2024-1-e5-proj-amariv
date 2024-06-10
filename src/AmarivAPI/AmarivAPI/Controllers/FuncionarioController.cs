using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using AmarivAPI.Models;
using AmarivAPI.Services;
using AmarivAPI.DTOs.FuncionarioDtos;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace AmarivAPI.Controllers
{
    [Route("api/funcionario")]
    [ApiController]
    public class FuncionarioController : ControllerBase
    {
        private readonly FuncionarioService _funcionarioService;
        private readonly IMapper _mapper;

        public FuncionarioController(FuncionarioService funcionarioService, IMapper mapper)
        {
            _funcionarioService = funcionarioService;
            _mapper = mapper;
        }

        // Retorna todos os funcionários
        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll()
        {
            var funcionarios = _funcionarioService.GetAll();
            var funcionariosDto = _mapper.Map<IEnumerable<FuncionarioDto>>(funcionarios);
            return Ok(funcionariosDto);
        }

        // Retorna um funcionário com base no ID
        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult GetById(string id)
        {
            var funcionario = _funcionarioService.GetById(id);
            if (funcionario == null)
            {
                return NotFound("Funcionário não encontrado");
            }
            var funcionarioDto = _mapper.Map<FuncionarioDto>(funcionario);
            return Ok(funcionarioDto);
        }

        // Cria um novo funcionário
        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create(FuncionarioDto funcionarioDto)
        {
            try
            {
                var funcionario = _mapper.Map<Usuario>(funcionarioDto);
                _funcionarioService.Create(funcionario);
                var funcionarioResponseDto = _mapper.Map<FuncionarioResponseDto>(funcionario);
                return Ok(funcionarioResponseDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Atualiza as informações de um funcionário
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(string id, FuncionarioUpdateDto funcionarioDto)
        {
            var funcionario = _funcionarioService.GetById(id);
            if (funcionario == null)
            {
                return NotFound("Funcionário não encontrado");
            }

            _mapper.Map(funcionarioDto, funcionario); // Atualiza as propriedades do funcionário com base no DTO

            try
            {
                _funcionarioService.Update(funcionario);
                var funcionarioResponseDto = _mapper.Map<FuncionarioResponseDto>(funcionario);
                return Ok(funcionarioResponseDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Exclui um funcionário com base no ID
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(string id)
        {
            var funcionario = _funcionarioService.GetById(id);
            if (funcionario == null)
            {
                return NotFound("Funcionário não encontrado");
            }
            _funcionarioService.Delete(id);
            return NoContent();
        }
    }
}