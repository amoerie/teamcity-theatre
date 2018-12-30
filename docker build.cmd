@echo off

echo Building new docker image for TeamCityTheatre
docker build --file Dockerfile --tag teamcitytheatre_image .
pause