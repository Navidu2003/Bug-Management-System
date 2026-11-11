@echo off
echo ====================================================
echo Starting Bug Management System (Full-Stack)
echo ====================================================
echo.
echo Launching ASP.NET Core Backend in a new window...
start "Bug Management Backend (ASP.NET Core)" cmd /k "start-backend.bat"

echo Launching React Frontend in a new window...
start "Bug Management Frontend (React)" cmd /k "start-frontend.bat"

echo.
echo ====================================================
echo System launched!
echo Backend Swagger API: http://localhost:5260/swagger
echo Frontend Web App:   http://localhost:5173
echo ====================================================
pause

