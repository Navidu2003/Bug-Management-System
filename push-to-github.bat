@echo off
setlocal
echo ====================================================
echo Publish Bug Management System to GitHub
echo ====================================================
echo.
echo Make sure you have created an empty repository on GitHub:
echo https://github.com/new
echo.
set /p REPO_URL="Enter your GitHub repository URL (e.g. https://github.com/Navidu2003/bug-management-system.git): "

if "%REPO_URL%"=="" (
    echo Error: No repository URL entered.
    pause
    exit /b 1
)

echo.
echo Setting remote origin to: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo Pushing branch 'main' to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================================
    echo SUCCESS! Repository successfully published to GitHub!
    echo View your code at: %REPO_URL%
    echo ====================================================
) else (
    echo.
    echo ====================================================
    echo Push failed. Please check your URL and GitHub credentials.
    echo ====================================================
)

echo.
pause
