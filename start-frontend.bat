@echo off
echo ====================================================
echo Starting Bug Management System - React Frontend (Vite)
echo ====================================================

cd /d "%~dp0frontend"
echo Starting Vite dev server on http://localhost:5173 ...
echo.
npm run dev
pause

