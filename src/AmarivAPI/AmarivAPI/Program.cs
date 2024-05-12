using AmarivAPI.Data;
using AmarivAPI.EmployeeAPI.Services;
using AmarivAPI.Models;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
    options.AddPolicy(name: "_allowDevelopmentDomain",
        policy => {
            policy.WithOrigins("http://localhost:3000");
            policy.WithOrigins("http://10.0.2.2:3000");
            policy.WithHeaders(["Access-Control-Allow-Headers", "*"]);
        }
    );
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("AmarivConnection");

builder.Services.AddDbContext<AmarivContext>(opts =>
opts.UseLazyLoadingProxies().UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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
}).AddJwtBearer(token => {
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
builder.Services.AddScoped<UserService, UserService>();

var app = builder.Build();
app.UseCors("_allowDevelopmentDomain");

// Configure the HTTP request pipeline.
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
