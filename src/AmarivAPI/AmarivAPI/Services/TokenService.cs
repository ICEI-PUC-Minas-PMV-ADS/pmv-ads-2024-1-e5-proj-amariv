using AmarivAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AmarivAPI.Services
{
    public class TokenService
    {
        public Token CreateToken(IdentityUser<string> usuario)
        {
            Claim[] direitosUsuario =
            [
                new Claim("username", usuario.UserName),
                new Claim("id", usuario.Id.ToString())
            ];

            var chave = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("fglzdrUAYU2S1wL2G4jXbtlXhVa2AG35"));

            var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: direitosUsuario,
                signingCredentials: credenciais,
                expires: DateTime.UtcNow.AddDays(30)
                );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return new Token( tokenString );
        }
    }
}
