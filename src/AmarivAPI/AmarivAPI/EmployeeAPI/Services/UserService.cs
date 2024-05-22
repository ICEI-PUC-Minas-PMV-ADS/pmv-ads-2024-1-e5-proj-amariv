#nullable enable

using AmarivAPI.EmployeeAPI.Data.DTOs;
using AmarivAPI.Models;
using AmarivAPI.Services;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace AmarivAPI.EmployeeAPI.Services
{
    public class UserService
    {
        private IMapper _mapper;
        private SignInManager<Usuario> _signInManager;
        private TokenService _tokenService;

        public UserService(
            IMapper mapper,
            SignInManager<Usuario> signInManager,
            TokenService tokenService
        ) {
            _mapper = mapper;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<Result<object>> SignInAsync(SignInDTO signInDTO)
        {
            SignInResult result = await _signInManager.PasswordSignInAsync(signInDTO.Email, signInDTO.Password, false, false);
            if (result.Succeeded)
            {
                Usuario? user = RecuperaUsuarioPorEmail(signInDTO.Email);
                if (user != null)
                {
                    IList<string> roles = await _signInManager.UserManager.GetRolesAsync(user);
                    if (roles.Contains("funcionario"))
                    {
                        return Result.Ok<object>(new {
                            token = _tokenService.CreateToken(user, roles.FirstOrDefault()).Value,
                        });
                    }
                    else
                    {
                        return Result.Fail("Sua conta não possui as credenciais para entrar no sistema");
                    }
                }
            }
            return Result.Fail("Usuário e/ou senha invalidos!");
        }

        internal Task<Usuario?> GetUserInfo(System.Security.Claims.ClaimsPrincipal c)
        {
            var userId = c.Claims.FirstOrDefault(c =>
                string.Equals(c.Type, "id", StringComparison.InvariantCultureIgnoreCase))?.Value;
            if (userId == null)
            {
                return Task.FromResult<Usuario?>(null);
            }
            return _signInManager.UserManager.FindByIdAsync(userId);
        }

        public Usuario? RecuperaUsuarioPorEmail(string email)
        {
            return _signInManager
                .UserManager
                .Users
                .FirstOrDefault(usuario => usuario.NormalizedUserName == email.ToUpper());
        }

        public Task<Result<string?>> Logout()
        {
            var resultado = _signInManager.SignOutAsync();
            if (resultado.IsCompletedSuccessfully)
            {
                return Task.FromResult(Result.Ok<string?>(null));
            }
            return Task.FromResult(Result.Fail<string?>("Logout falhou"));
        }
    }
}
