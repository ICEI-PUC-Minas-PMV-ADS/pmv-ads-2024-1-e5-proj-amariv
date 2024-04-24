using AmarivAPI.Data;
using AmarivAPI.Models;
using AmarivAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("AmarivConnection");

builder.Services.AddDbContext<AmarivContext>(opts =>
opts.UseLazyLoadingProxies().UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddIdentity<Usuario, IdentityRole>().AddEntityFrameworkStores<AmarivContext>();

builder.Services.AddScoped<UsuarioService, UsuarioService>();
builder.Services.AddScoped<MaterialService, MaterialService>();
builder.Services.AddScoped<TokenService, TokenService>();
builder.Services.AddScoped<ItensRoteiroDeColetasService, ItensRoteiroDeColetasService>();
builder.Services.AddScoped<RoteiroDeColetasService, RoteiroDeColetasService>();


var app = builder.Build();

app.UseCors("_allowDevelopmentDomain");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
