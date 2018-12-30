@echo off
:: PREP FOLDERS
if not exist docker mkdir docker
if not exist docker\logs mkdir docker\logs
if not exist docker\data mkdir docker\data

:: BUILD DOCKER IMAGE
echo Building docker image for TeamCityTheatre
docker build --file Dockerfile --tag teamcitytheatre_image .
if %errorlevel% neq 0 (
    echo Failed to build docker image
    pause
    exit /b %errorlevel%
)

:: STOP AND REMOVE EXISTING CONTAINER
echo Stopping and removing previous container
docker stop teamcitytheatre 2>nul 
docker rm teamcitytheatre 2>nul

:: START NEW DOCKER CONTAINER
echo Starting TeamCityTheatre container
set dockerlogs="%~dp0docker\logs"
set dockerdata="%~dp0docker\data"
docker run --detach --publish 12000:80 --name teamcitytheatre --env-file docker.env --volume "%dockerlogs%":"C:\TeamCityTheatre\Logs" --volume "%dockerdata%":"C:\TeamCityTheatre\Data" teamcitytheatre_image

if %errorlevel% neq 0 (
    echo Failed to run docker image
    pause
    exit /b %errorlevel%
)

echo Giving the server some time to spin up
timeout 5
echo TeamCityTheatre should be started by now
set GET_IP="docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" teamcitytheatre"
FOR /F "tokens=*" %%i IN (' %GET_IP% ') DO SET IP=%%i
echo The server should be accessible via http://%IP% or via http://localhost:12000
echo You can inspect logs under %dockerlogs% and configuration.json under %dockerdata%
pause