@echo off
cd /d "%~dp0"

echo.
echo ========================================
echo   Archon Site - Local Server
echo ========================================
echo.

where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting server...
    echo.
    echo Open this URL in your browser:
    echo   http://localhost:8080/
    echo.
    echo Press Ctrl+C to stop the server.
    echo.
    start "" "http://localhost:8080/"
    python -m http.server 8080
) else (
    where py >nul 2>&1
    if %errorlevel% equ 0 (
        echo Starting server...
        echo.
        echo Open this URL in your browser:
        echo   http://localhost:8080/
        echo.
        echo Press Ctrl+C to stop the server.
        echo.
        start "" "http://localhost:8080/"
        py -m http.server 8080
    ) else (
        echo ERROR: Python is not installed or not in your PATH.
        echo.
        echo Option 1: Install Python from https://python.org
        echo Option 2: Use Node.js - run:  npx serve .
        echo.
    )
)

pause
