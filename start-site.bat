@echo off
setlocal

set "PORT=4173"
if not "%~1"=="" set "PORT=%~1"

cd /d "%~dp0"

echo Starting FryCuisine static site...
set "URL=http://127.0.0.1:%PORT%/home.html"
echo Open: %URL%
echo This script will open the page automatically.
echo Keep this window open while viewing the site.
echo Press Ctrl+C to stop the server.
echo.

where py >nul 2>nul
if %ERRORLEVEL%==0 (
    start "" "%URL%"
    py -3 -m http.server %PORT%
    goto :eof
)

where python >nul 2>nul
if %ERRORLEVEL%==0 (
    start "" "%URL%"
    python -m http.server %PORT%
    goto :eof
)

echo Error: Python is required to serve this static site.
echo Install Python from https://www.python.org/downloads/ and try again.
pause
exit /b 1
