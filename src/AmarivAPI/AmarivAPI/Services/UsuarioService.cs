using AmarivAPI.Data.Dtos;
using AmarivAPI.Models;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;

namespace AmarivAPI.Services
{
    public class UsuarioService
    {
        public IMapper _mapper;
        public UserManager<Usuario> _userManager;
        public SignInManager<Usuario> _signInManager;
        public TokenService _tokenService;
        public UsuarioService(IMapper mapper, UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, TokenService tokenService) 
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public Result<Usuario> CadastraUsuario(CreateUsuarioDto createDto)
        {
            Usuario usuario = _mapper.Map<Usuario>(createDto);
            Task<IdentityResult> resultado = _userManager.CreateAsync(usuario, createDto.Password);
            if(resultado.Result.Succeeded) 
            {
                return Result.Ok(usuario);
            }
            return Result.Fail("Falha ao cadastrar usuário");
        }

        public Result LogaUsuario(LoginRequest request)
        { 
            Task<SignInResult> resultado = _signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
            if(resultado.Result.Succeeded)
            {
                var identityUser = _signInManager
                    .UserManager
                    .Users
                    .FirstOrDefault(usuario => usuario.NormalizedUserName == request.Email.ToUpper());

                Token token = _tokenService.CreateToken(identityUser);

                return Result.Ok().WithSuccess(token.Value);
            }
            return Result.Fail("Falha ao logar");
        }

        public Result Logout()
        {
            var resultado = _signInManager.SignOutAsync();
            if(resultado.IsCompletedSuccessfully)
            {
                return Result.Ok();
            }
            return Result.Fail("Logout falhou");
        }
    }
}
