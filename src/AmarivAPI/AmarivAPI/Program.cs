using AmarivAPI.Data;
using AmarivAPI.Models;
using AmarivAPI.Profiles;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("_allowDevelopmentDomain", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://10.0.2.2:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var connectionString = builder.Configuration.GetConnectionString("AmarivConnection");

builder.Services.AddDbContext<AmarivContext>(opts =>
    opts.UseLazyLoadingProxies().UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddIdentity<Usuario, IdentityRole>()
    .AddEntityFrameworkStores<AmarivContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(token =>
{
    token.RequireHttpsMetadata = false;
    token.SaveToken = true;
    token.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("fglzdrUAYU2S1wL2G4jXbtlXhVa2AG35")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddScoped<UsuarioService, UsuarioService>();
builder.Services.AddScoped<MaterialService, MaterialService>();
builder.Services.AddScoped<TokenService, TokenService>();
builder.Services.AddScoped<ItensRoteiroDeColetasService, ItensRoteiroDeColetasService>();
builder.Services.AddScoped<RoteiroDeColetasService, RoteiroDeColetasService>();
builder.Services.AddScoped<EmailService, EmailService>();
builder.Services.AddScoped<NotificacaoService, NotificacaoService>();
builder.Services.AddScoped<FuncionarioService>();
builder.Services.AddAutoMapper(typeof(NotificacaoProfile).Assembly);
builder.Services.AddAutoMapper(typeof(FuncionarioProfile).Assembly);

var app = builder.Build();

app.UseCors("_allowDevelopmentDomain");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
