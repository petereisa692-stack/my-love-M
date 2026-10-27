@echo off
rem Start a simple HTTP server for testing the romantic website
cd /d "%~dp0"
python -m http.server 8000
pause