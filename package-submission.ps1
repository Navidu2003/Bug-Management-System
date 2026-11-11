# Package Submission Script
$ProgressPreference = "SilentlyContinue"
$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$zipOutput = Join-Path $projectRoot "BugManagementSystem_Submission.zip"
$tempStage = Join-Path $env:TEMP "BugManagement_Stage_$(Get-Random)"

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "Creating Clean Assignment Submission ZIP..." -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# Remove old zip if exists
if (Test-Path $zipOutput) {
    Remove-Item $zipOutput -Force
    Write-Host "Removed existing submission zip." -ForegroundColor Yellow
}

# Create temp stage directory
if (Test-Path $tempStage) {
    Remove-Item $tempStage -Recurse -Force
}
New-Item -ItemType Directory -Path $tempStage | Out-Null

Write-Host "Copying files to staging area..." -ForegroundColor White

# 1. Copy Backend (excluding bin/ and obj/)
$backendDest = Join-Path $tempStage "backend"
robocopy (Join-Path $projectRoot "backend") $backendDest /E /XD bin obj /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null

# 2. Copy Frontend (excluding node_modules/ and dist/)
$frontendDest = Join-Path $tempStage "frontend"
robocopy (Join-Path $projectRoot "frontend") $frontendDest /E /XD node_modules dist .vite /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null

# 3. Copy Screenshots
$screenshotsDest = Join-Path $tempStage "screenshots"
robocopy (Join-Path $projectRoot "screenshots") $screenshotsDest /E /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null

# 4. Copy Root Files
$rootFiles = @(
    "README.md",
    ".gitignore",
    "start-all.bat",
    "start-backend.bat",
    "start-frontend.bat"
)

foreach ($file in $rootFiles) {
    $src = Join-Path $projectRoot $file
    if (Test-Path $src) {
        Copy-Item $src -Destination (Join-Path $tempStage $file) -Force
    }
}

Write-Host "Compressing into ZIP archive..." -ForegroundColor White
Compress-Archive -Path "$tempStage\*" -DestinationPath $zipOutput -CompressionLevel Optimal

# Cleanup temp staging
Remove-Item $tempStage -Recurse -Force

$zipSize = (Get-Item $zipOutput).Length
$zipSizeMB = [math]::Round($zipSize / 1MB, 2)

Write-Host "====================================================" -ForegroundColor Green
Write-Host "SUCCESS! Submission package ready:" -ForegroundColor Green
Write-Host "File: $zipOutput" -ForegroundColor Cyan
Write-Host "Size: $zipSizeMB MB ($zipSize bytes)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Green
