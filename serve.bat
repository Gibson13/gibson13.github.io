<<<<<<< HEAD
@echo off
cd /d "%~dp0"

echo.
echo ========================================
echo   Archon Site - Local Server
echo ========================================
echo.

REM Try python, then py (Windows Python launcher)
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting server...
    echo.
    echo Open this URL in your browser:
    echo   http://localhost:8080/Main.html
    echo.
    echo Press Ctrl+C to stop the server.
    echo.
    start "" "http://localhost:8080/Main.html"
    python -m http.server 8080
) else (
    where py >nul 2>&1
    if %errorlevel% equ 0 (
        echo Starting server...
        echo.
        echo Open this URL in your browser:
        echo   http://localhost:8080/Main.html
        echo.
        echo Press Ctrl+C to stop the server.
        echo.
        start "" "http://localhost:8080/Main.html"
        py -m http.server 8080
    ) else (
        echo ERROR: Python is not installed or not in your PATH.
        echo.
        echo Option 1: Install Python from https://python.org
        echo Option 2: Use Node.js - run:  npx serve .
        echo Option 3: Use Cursor's "Live Server" extension
        echo.
    )
)

pause
=======
@echo off
cd /d "%~dp0"

echo.
echo ========================================
echo   Archon Site - Local Server
echo ========================================
echo.

REM Try python, then py (Windows Python launcher)
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Starting server...
    echo.
    echo Open this URL in your browser:
    echo   http://localhost:8080/Main.html
    echo.
    echo Press Ctrl+C to stop the server.
    echo.
    start "" "http://localhost:8080/Main.html"
    python -m http.server 8080
) else (
    where py >nul 2>&1
    if %errorlevel% equ 0 (
        echo Starting server...
        echo.
        echo Open this URL in your browser:
        echo   http://localhost:8080/Main.html
        echo.
        echo Press Ctrl+C to stop the server.
        echo.
        start "" "http://localhost:8080/Main.html"
        py -m http.server 8080
    ) else (
        echo ERROR: Python is not installed or not in your PATH.
        echo.
        echo Option 1: Install Python from https://python.org
        echo Option 2: Use Node.js - run:  npx serve .
        echo Option 3: Use Cursor's "Live Server" extension
        echo.
    )
)

pause
>>>>>>> 746ca995f3eda8c3fd89fb23f33fa0cf112a2b06
