@echo off
echo ====================================================
echo Starting Bug Management System - ASP.NET Core Web API
echo ====================================================

set "DOTNET_CLI_HOME=%~dp0.dotnet_home"
set "NUGET_PACKAGES=%~dp0.nuget_packages"
set "DOTNET_CLI_TELEMETRY_OPTOUT=1"
set "DOTNET_NOLOGO=1"
set "PATH=%~dp0.dotnet;%PATH%"

cd /d "%~dp0backend"
echo Restoring and running backend on http://localhost:5260 ...
echo Swagger UI will be available at: http://localhost:5260/swagger
echo.
"%~dp0.dotnet\dotnet.exe" run --urls "http://localhost:5260"
pause

