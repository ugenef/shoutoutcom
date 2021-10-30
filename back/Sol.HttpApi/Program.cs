using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Sol.Accounts.Impl.DependencyInjection;
using Sol.HttpApi.ServiceCollectionExtensions;
using Sol.Token.Impl.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var connectionString = config["MONGO_CONN_STR"];
var database = config["Mongo:Database"];

builder.Services.AddSolToken(connectionString, database,o =>
{
    o.ValidIssuer = config["Jwt:ValidIssuer"];
    o.ValidAudience = config["Jwt:ValidAudience"];
    o.Key = config["JWT_KEY"];
});
builder.Services.AddSolAccounts(connectionString, database);
builder.Services.AddSolCors(builder.Environment.EnvironmentName);
builder.Services.AddSolJwtAuthentication(config);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new() { Title = "Sol.HttpApi", Version = "v1" }); });

#region Middleware
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sol.HttpApi v1"));
}

app.UseCors(builder.Environment.EnvironmentName);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
#endregion

app.Run();