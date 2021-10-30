FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Sol.HttpApi/Sol.HttpApi.csproj", "Sol.HttpApi/"]
RUN dotnet restore "Sol.HttpApi/Sol.HttpApi.csproj"
COPY . .
WORKDIR "/src/Sol.HttpApi"
RUN dotnet build "Sol.HttpApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Sol.HttpApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Sol.HttpApi.dll"]
