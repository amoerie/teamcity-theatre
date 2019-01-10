#####################
#                   #
# MULTI STAGE BUILD #
#                   #
#####################


#########################
                       
#######################
                      
# STAGE : NPM INSTALL #
                      
#######################
FROM node:10.14 AS npminstall
WORKDIR /TeamCityTheatre

# copy bare minimum files needed to restore NPM packages
COPY ./src/TeamCityTheatre.Web/package.json ./TeamCityTheatre.Web/
COPY ./src/TeamCityTheatre.Web/package-lock.json ./TeamCityTheatre.Web/

WORKDIR /TeamCityTheatre/TeamCityTheatre.Web

# install node packages
RUN npm ci

#######################
                      
# STAGE : NPM BUILD   #
                       
#######################
FROM npminstall as npmbuild

WORKDIR /TeamCityTheatre/TeamCityTheatre.Web

# and everything else needed to build the frontend
COPY ./src/TeamCityTheatre.Web/tsconfig.json ./
COPY ./src/TeamCityTheatre.Web/webpack.config.js ./
COPY ./src/TeamCityTheatre.Web/Views/ ./Views/

# .. and build the frontend
RUN npm run build:release

############################
                       
# STAGE : DOT NET RESTORE  #
                       
############################
FROM microsoft/dotnet:2.2-sdk AS dotnetrestore
WORKDIR /TeamCityTheatre

# copy bare minimum files needed to restore dot net packages
COPY src/TeamCityTheatre.sln ./
COPY src/TeamCityTheatre.Web/TeamCityTheatre.Web.csproj ./TeamCityTheatre.Web/
COPY src/TeamCityTheatre.Core/TeamCityTheatre.Core.csproj ./TeamCityTheatre.Core/
RUN dotnet restore

############################
                       
# STAGE : DOT NET PUBLISH  #
                       
############################
FROM dotnetrestore AS dotnetpublish
WORKDIR /TeamCityTheatre

# copy prebuilt frontend files
COPY --from=npmbuild ./TeamCityTheatre/TeamCityTheatre.Web/wwwroot/ ./TeamCityTheatre.Web/wwwroot/

# copy necessary project files to build .NET
COPY src/TeamCityTheatre.Core/. ./TeamCityTheatre.Core/
COPY src/TeamCityTheatre.Web/. ./TeamCityTheatre.Web/

# publish
RUN dotnet publish "./TeamCityTheatre.Web/TeamCityTheatre.Web.csproj" --verbosity normal --configuration Release --output "/Output"

############################
                       
# STAGE : RUN APPLICATION  #
                       
############################
FROM microsoft/dotnet:2.2-aspnetcore-runtime AS runtime
WORKDIR /TeamCityTheatre 

RUN mkdir Data
RUN mkdir Logs

COPY --from=dotnetpublish /Output ./

ENTRYPOINT ["dotnet", "TeamCityTheatre.Web.dll"]