@echo off
echo ====================================================
echo Packaging Clean Submission ZIP for Bug Management System
echo ====================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0package-submission.ps1"
echo.
pause

