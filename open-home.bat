@echo off
setlocal

cd /d "%~dp0"

echo Opening FryCuisine directly in your browser...
start "" "%CD%\home.html"
