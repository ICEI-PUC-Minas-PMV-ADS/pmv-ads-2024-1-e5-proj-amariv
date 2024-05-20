﻿using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using AmarivAPI.Models;
using AmarivAPI.Services;
using AmarivAPI.DTOs.FuncionarioDtos;
using System;
using System.Collections.Generic;

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
        public IActionResult GetAll()
        {
            var funcionarios = _funcionarioService.GetAll();
            var funcionariosDto = _mapper.Map<IEnumerable<FuncionarioDto>>(funcionarios);
            return Ok(funcionariosDto);
        }

        // Retorna um funcionário com base no ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
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
        public IActionResult Create(FuncionarioDto funcionarioDto)
        {
            try
            {
                var funcionario = _mapper.Map<Funcionario>(funcionarioDto);
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
        public IActionResult Update(int id, FuncionarioUpdateDto funcionarioDto)
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
        public IActionResult Delete(int id)
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