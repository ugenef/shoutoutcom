using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sol.HttpApi.ServiceCollectionExtensions;
using Sol.HttpApi.Token.Impl.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
builder.Services.AddToken(config);
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new() { Title = "Sol.HttpApi", Version = "v1" }); });

builder.Services.AddJwtAuthentication(config);

#region Middleware
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sol.HttpApi v1"));
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
#endregion

app.Run();