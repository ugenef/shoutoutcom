using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sol.HttpApi.ServiceCollectionExtensions;
using Sol.Token.Impl.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
builder.Services.AddSolToken(o =>
{
    o.ValidIssuer = config["Jwt:ValidIssuer"];
    o.ValidAudience = config["Jwt:ValidAudience"];
    o.Key = config["Jwt:Key"];
});
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