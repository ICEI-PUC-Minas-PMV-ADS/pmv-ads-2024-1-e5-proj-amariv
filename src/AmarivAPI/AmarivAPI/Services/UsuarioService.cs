using AmarivAPI.Data;
using AmarivAPI.Data.Dtos.TokenDto;
using AmarivAPI.Data.Dtos.UsuarioDtos;
using AmarivAPI.Data.Requests;
using AmarivAPI.Models;
using AmarivAPI.Utils;
using AutoMapper;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Web;

namespace AmarivAPI.Services
{
    public class UsuarioService
    {
        private IMapper _mapper;
        private UserManager<Usuario> _userManager;
        private SignInManager<Usuario> _signInManager;
        private TokenService _tokenService;
        private EmailService _emailService;
        private RoleManager<IdentityRole> _roleManager;
        private AmarivContext _context;

        public UsuarioService(IMapper mapper, UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, TokenService tokenService, EmailService emailService, RoleManager<IdentityRole> roleManager, AmarivContext context)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _emailService = emailService;
            _roleManager = roleManager;
            _context = context;
        }

        public Usuario RecuperaUsuarioPorEmail(string email)
        {
            return _signInManager
                    .UserManager
                    .Users
                    .FirstOrDefault(usuario => usuario.NormalizedUserName == email.ToUpper());
        }

        public Boolean EmailDisponivel(ValidaEmailRequest request)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == request.Email);
            
            if(user == null)
            {
                return true;
            }
            return false;
        }

        public ReadUsuarioDto RecuperaReadUsuarioDtoPorId (string id)
        {
           var usuario = _signInManager
                    .UserManager
                    .Users
                    .FirstOrDefault(usuario => usuario.Id == id);

            var map = _mapper.Map<ReadUsuarioDto>(usuario);

            return map;
        }

        public async Task<Result> CadastraCliente(CreateUsuarioDto createDto)
        {
            Usuario usuario = _mapper.Map<Usuario>(createDto);
            IdentityResult resultado = await _userManager.CreateAsync(usuario, createDto.Password);
            await _userManager.AddToRoleAsync(usuario, "cliente");
            if(resultado.Succeeded) 
            {
                var identityUser = RecuperaUsuarioPorEmail(createDto.Email);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
                _emailService.EnviarEmailConfirmacao(new[] {identityUser.Email}, "Confirme seu email", identityUser.Id, code);
                Token token = _tokenService.CreateToken(identityUser, _signInManager.UserManager.GetRolesAsync(identityUser).Result.FirstOrDefault());
                return Result.Ok().WithSuccess(token.Value);
            }
            return Result.Fail("Falha ao cadastrar usuário");
        }

        public async Task<Result> CadastraFuncionario(CreateUsuarioDto createDto)
        {
            Usuario usuario = _mapper.Map<Usuario>(createDto);
            IdentityResult resultado = await _userManager.CreateAsync(usuario, createDto.Password);
            await _userManager.AddToRoleAsync(usuario, "funcionario");
            if (resultado.Succeeded)
            {
                var identityUser = RecuperaUsuarioPorEmail(createDto.Email);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
                _emailService.EnviarEmailConfirmacao(new[] { identityUser.Email }, "Confirme seu email", identityUser.Id, code);
                return Result.Ok().WithSuccess("Usuário cadastrado com sucesso!");
            }
            return Result.Fail("Falha ao cadastrar usuário");
        }

        public Result LogaUsuario(LoginRequest request)
        { 
            var resultado = _signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
            if(resultado.Result.Succeeded)
            {
                var identityUser = RecuperaUsuarioPorEmail(request.Email);

                Token token = _tokenService.CreateToken(identityUser, _signInManager.UserManager.GetRolesAsync(identityUser).Result.FirstOrDefault());

                return Result.Ok().WithSuccess(token.Value);
            }
            return Result.Fail("Falha ao logar");
        }

        [Authorize]
        public Result Logout()
        {
            var resultado = _signInManager.SignOutAsync();
            if(resultado.IsCompletedSuccessfully)
            {
                return Result.Ok();
            }
            return Result.Fail("Logout falhou");
        }

        public Result ConfirmaEmail(ConfirmaEmailRequest request)
        {
            var identityUser = _signInManager
                    .UserManager
                    .Users
                    .FirstOrDefault(usuario => usuario.Id == request.UsuarioId);

            var identityResult = _userManager.ConfirmEmailAsync(identityUser, request.CodigoAtivacao);
            if(identityResult.Result.Succeeded)
            {
                return Result.Ok().WithSuccess("Email confirmado com sucesso!");
            }
            return Result.Fail("Falha ao confirmar email");
        }

        public Result SolicitaRecuperacao(SolicitaRecuperacaoRequest request)
        {
            var identityUser = RecuperaUsuarioPorEmail(request.Email);

            if(identityUser != null)
            {
                string codigoDeRecuperacao = _signInManager.UserManager.GeneratePasswordResetTokenAsync(identityUser).Result;
                _emailService.EnviarEmailRecuperacao(identityUser.Email, "Recupere sua senha", codigoDeRecuperacao);
                return Result.Ok().WithSuccess("Solicitacao realizada com sucesso!");
            }
            return Result.Fail("Falha ao solicitar recuperacao");
        }

        public async Task<Result> SolicitaConfirmacao(SolicitaConfirmacaoRequest request)
        {
            var identityUser = RecuperaUsuarioPorEmail(request.Email);

            if (identityUser != null)
            {
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(identityUser);
                _emailService.EnviarEmailConfirmacao(new[] { identityUser.Email }, "Confirme seu email", identityUser.Id, code);
                return Result.Ok().WithSuccess("Solicitacao realizada com sucesso!");
            }
            return Result.Fail("Falha ao solicitar confirmacao");

        }

        public Result RecuperaSenha(RecuperaSenhaRequest request)
        {
            var identityUser = RecuperaUsuarioPorEmail(request.Email);

            var identityResult = _userManager.ResetPasswordAsync(identityUser, request.CodigoRecuperacao, request.Password).Result;
            if (identityResult.Succeeded)
            {
                return Result.Ok().WithSuccess("Senha redefinida com sucesso!");
            }
            return Result.Fail("Falha ao recuperar senha");
        }

        public Result AlteraUsuario(UpdateUsuarioDto dto, String userId)
        {
            try
            {
                var identityUser = _signInManager
                    .UserManager
                    .Users
                    .FirstOrDefault(usuario => usuario.Id == userId);
                
                    identityUser.Nome = dto.Nome;
                    identityUser.Celular = dto.Celular;
                    identityUser.Telefone = dto.Telefone;
                
                _context.Users.Update(identityUser);
                _context.SaveChanges();
                return Result.Ok().WithSuccess("Usuario atualizado com sucesso!");
            }
            catch
            {
                return Result.Fail("Falha ao atualizar usuario!");
            }
            
        }

        public async Task<Result> Google(ExternalTokenDTO externalToken)
        {
            var email = ValidateToken.Authenticate(externalToken.Token);
            if (email is not null)
            {
                var exist = await _userManager.FindByEmailAsync(email);

                if (exist is null)
                {
                    var usuario = new Usuario
                    {
                        Nome = email.Split("@")[0],
                        UserName = email,
                        Email = email,
                        EmailConfirmed = true
                    };
                    IdentityResult resultado = await _userManager.CreateAsync(usuario);
                    await _userManager.AddToRoleAsync(usuario, "cliente");
                    if (resultado.Succeeded)
                    {
                        var identityUser = RecuperaUsuarioPorEmail(email);
                        Token token = _tokenService.CreateToken(identityUser, _signInManager.UserManager.GetRolesAsync(identityUser).Result.FirstOrDefault());
                        return Result.Ok().WithSuccess(token.Value);
                    }
                }

                Token tokenExist = _tokenService.CreateToken(exist, _signInManager.UserManager.GetRolesAsync(exist).Result.FirstOrDefault());
                return Result.Ok().WithSuccess(tokenExist.Value);
            }
            return Result.Fail("Erro ao validar token recebido pelo Google!");
        }
            
        }
    }

