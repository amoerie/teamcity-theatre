# :tv: TeamCity Theatre 

[![Build Status Travis CI](https://travis-ci.org/amoerie/teamcity-theatre.svg?branch=master)](https://travis-ci.org/amoerie/teamcity-theatre) [![Build Status Azure Devops](https://amoerman.visualstudio.com/TeamCity%20Theatre/_apis/build/status/amoerie.teamcity-theatre?branchName=master)](https://amoerman.visualstudio.com/TeamCity%20Theatre/_build/latest?definitionId=4&branchName=master)

A .NET MVC web application to monitor your TeamCity builds. 
Stick a TV on the wall, open a browser there and enjoy your TeamCity projects in all their red and green glory.

## Screenies

### The home page: choose your team
![Choose your team](http://i.imgur.com/64YxBRb.png)

### Team view
![The dashboard screen](http://i.imgur.com/izZiWVd.png)

### Configuration: manage your views and their tiles
![The config screen](http://i.imgur.com/4Rg4yi6.png)

## Features

- First-class support for branches! (This is a feature many others are lacking)
- Create multiple dashboards, one for each team!
- Customizable amount of branches shown per tile
- Customizable amount of columns shown per view, make optimal use of the size of your wall TV!
- Customizable labels on tiles
- Docker support!
- Quite extensive logging
- Customize TeamCity query

## Requirements

- A TeamCity server (d'uh). TeamCityTheatre is confirmed to be compatible with 2017.1.4 (build 47070). Other versions may or may not work.
- .NET Core Runtime 2.2 (downloadable from https://www.microsoft.com/net/download/all )
- If you want to use IIS:
  - A Windows Server with IIS to host the web application
  - .NET Core Windows Hosting Bundle, downloadable from the same page you downloaded the runtime from
  - Some knowledge on how to add a .NET web application in IIS, or the willingness to learn.
- If you  want to use Docker:
  - Docker for Windows using Windows Containers. Linux and Linux containers might work but that's still in testing phase.
- A nice cup of :coffee: to drink while you install this. 

## Installation instructions

1. Download and unzip the [the latest release](https://github.com/amoerie/teamcity-theatre/releases)
2. Configure your TeamCity settings, the application needs to somehow get access to the TeamCity API. The following authentication modes are supported:
  - "Guest" mode: If your TeamCity is configured with guest access, you can use 'Guest' as the authentication mode. You don't need any credentials.
  - "BasicAuthentication" mode: Every HTTP call will have a basic authentication header with a username and password. 
  - "AccessToken": Every HTTP call will have an access token in the header
3. To configure authentication:
  - Either add the following to the `appsettings.json` file:

```javascript
  "Connection": {
    "Url": "http://your-teamcity-server/",
    "AuthenticationMode": "BasicAuthentication" // or "Guest" or "AccessToken"
    "Username": "your-teamcity-username", // if using Basic
    "Password": "your-teamcity-password", // if using Basic
    "AccessToken": "your-teamcity-accesstoken", // if using AccessToken
  }
```
  - OR add the following environment parameters: (watch the number of underscores!!!)
    - TEAMCITYTHEATRE_CONNECTION__URL
    - TEAMCITYTHEATRE_CONNECTION__AUTHENTICATIONMODE
    - TEAMCITYTHEATRE_CONNECTION__USERNAME
    - TEAMCITYTHEATRE_CONNECTION__PASSWORD
    - TEAMCITYTHEATRE_CONNECTION__ACCESSTOKEN

3. (Optional) In appsettings.json, change the location of the configuration.json file or leave the default. This file will contain your views/tiles/etc.
4. (Optional) In appsettings.json, change the logging configuration. It's quite verbose by default, but will never take more than 75MB of space.
5. Start the application in one of the following ways
  - Run the following command: `dotnet TeamCityTheatre.Web.dll`
  - Install this folder as a web application in IIS:
    - Application pool should use .NET CLR version 'No Managed Code'
    - Application pool should use Managed Pipeline mode 'Integrated'
    - Ensure the application pool has the read/write access rights to
      - the folder in which configuration.json resides
      - the folder in which log files will be written
  
## Usage instructions

Open the web application from a browser
  - Open the settings page from the main menu. 
    - If you see any errors, your server or credentials might be incorrect. Check the log files to see why the network request failed.
  - Add a new view, give it a name.
  - Expand your TeamCity projects in the left bottom pane and select one to see its build configurations.
  - Add build configurations to your view. These will become the tiles of your view.
  - Open the dashboard from the main menu and select your view
  - Wait for the data to load. 
  - Enjoy.

## Compilation instructions

1. Ensure you have [.NET Core SDK 2.x](https://www.microsoft.com/net/download/core) installed
2. Ensure you have [Node](https://nodejs.org/en/) installed
3. Execute "publish.cmd" or "publish.sh" depending on your operating system.
4. If all goes well, that should create a folder 'publish-output' which is all you need to host the application. See Installation instructions from here.

## Contributors

- [amoerie](https://github.com/amoerie)
- [tauptk](https://github.com/tauptk)
- [trolleyyy](https://github.com/trolleyyy)
- [LazyTarget](https://github.com/LazyTarget)
- [jimmycav](https://github.com/jimmycav)
