@echo off
:::::::::::::::::::::::::::::::::::::::::
:: Automatically check & get admin rights
:::::::::::::::::::::::::::::::::::::::::
CLS
ECHO.

:checkPrivileges
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges )

:getPrivileges
if '%1'=='ELEV' (shift & goto gotPrivileges)
ECHO.
ECHO =====================================
ECHO Invoking UAC for Privilege Escalation
ECHO =====================================

setlocal DisableDelayedExpansion
set "batchPath=%~0"
setlocal EnableDelayedExpansion
ECHO Set UAC = CreateObject^("Shell.Application"^) > "%temp%\OEgetPrivileges.vbs"
ECHO UAC.ShellExecute "!batchPath!", "ELEV", "", "runas", 1 >> "%temp%\OEgetPrivileges.vbs"
"%temp%\OEgetPrivileges.vbs"
exit /B

:gotPrivileges
::::::::::::::::::::::::::::
::START
::::::::::::::::::::::::::::
setlocal & pushd .

REM Administrator Privileges acquired. Anything beyond this point will run in elevated mode. 
set "DIR=%~dp0"
cd %~dp0
TITLE TeamCityTheatre -- Publish to local IIS
Powershell.exe -File build.ps1 -Target CreateIISApplication
CHOICE /T 10 /C yYnN /CS /D y  /M "Should this window close? [Default y, you have 10 seconds]:"
if errorlevel 2 pause