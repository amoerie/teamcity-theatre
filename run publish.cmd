@echo off
TITLE TeamCityTheatre -- Publish
Powershell.exe -File build.ps1 -Target Publish
CHOICE /T 10 /C yYnN /CS /D y  /M "Should this window close? [Default y, you have 10 seconds]:"
if errorlevel 2 pause