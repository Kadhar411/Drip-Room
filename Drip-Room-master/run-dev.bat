@echo off
title Drip Room - Next.js Development Server
echo ===================================================
echo   Starting Drip Room Backend & Storefront Server
echo   URL: http://localhost:3000
echo ===================================================
echo.

if not exist node_modules (
  echo [1/2] Installing dependencies...
  call npm install
)

echo [2/2] Launching Next.js development server...
call npm run dev
pause
