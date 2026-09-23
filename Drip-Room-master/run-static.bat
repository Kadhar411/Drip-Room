@echo off
title Drip Room - Static Storefront Server
echo ===================================================
echo   Starting Drip Room Static Storefront Server
echo   URL: http://localhost:5500
echo ===================================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo Launching Python HTTP server on port 5500...
  python -m http.server 5500
  goto end
)

where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo Launching serve via npx on port 5500...
  call npx -y serve -l 5500 .
  goto end
)

echo Neither Python nor Node/npx was found in PATH.
echo You can open index.html directly in your web browser.
pause

:end
