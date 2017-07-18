#addin "Cake.IIS"
#addin "Cake.FileHelpers"
#addin "Cake.Yarn"

const string buildOutputFolderPath = "./build-output";
const string publishOutputFolderPath = "./publish-output";
const string NO_MANAGED_CODE = "";

const string sourcePath = "./src";
const string solutionFilePath = sourcePath + "/TeamCityTheatre.sln";

const string webProjectFolderPath = sourcePath + "/TeamCityTheatre.Web";
const string webCsProjPath = webProjectFolderPath + "/TeamCityTheatre.Web.csproj";

string target = Argument<string>("target", "");

Task("JsRestore")
  .Description("Restores the JavaScript NPM packages from package.json")
  .Does(() => {
    // restore authentication app dependencies
    Yarn.FromPath(webProjectFolderPath).Install();
  });

Task("DotNetRestore")
  .Description("Restores the .NET NuGet packages")
  .Does(() => DotNetCoreRestore(solutionFilePath));

Task("Restore")
  .IsDependentOn("JsRestore")
  .IsDependentOn("DotNetRestore");

Task("DotNetClean")
  // Waiting for next release of Cake to include this :-(
  //.Does(() => DotNetCoreClean(solutionFilePath));
  .Does(() => {StartProcess("dotnet", "clean " + solutionFilePath + " --configuration Release --verbosity normal"); });

Task("CleanBuildOutputFolder")
  .Does(() => {
    CleanDirectory(buildOutputFolderPath);
    Information("Cleaned " + buildOutputFolderPath);
  });

Task("JsBuild")
  .Description("Builds the JavaScript source code")
  .IsDependentOn("JsRestore")
  .Does(() => Yarn.FromPath(webProjectFolderPath).RunScript("build:release"));

Task("DotNetBuild")
  .Description("Builds the .NET source code")
  .IsDependentOn("DotNetRestore")
  .IsDependentOn("DotNetClean")
  .Does(() => {
    var buildSettings = new DotNetCoreBuildSettings {
      Configuration = "Release",
      OutputDirectory = buildOutputFolderPath
    };
    DotNetCoreBuild(webCsProjPath, buildSettings);
  });

Task("Build")
  .Description("Builds both the .NET and JavaScript source code")
  .IsDependentOn("CleanBuildOutputFolder")
  .IsDependentOn("JsBuild")
  .IsDependentOn("DotNetBuild");

Task("CleanPublishOutputFolder")
  .Does(() => {
    CleanDirectory(publishOutputFolderPath);
    Information("Cleaned " + publishOutputFolderPath);
  });

Task("Publish")
  .Description("Bundles the web application and publishes the result to " + publishOutputFolderPath)
  .IsDependentOn("CleanPublishOutputFolder")
  .IsDependentOn("Build")
  .Does(() => {
    var publishSettings = new DotNetCorePublishSettings {
      Configuration = "Release",
      OutputDirectory = publishOutputFolderPath
    };
    DotNetCorePublish(webCsProjPath, publishSettings);
  });

var applicationPoolSettings = new ApplicationPoolSettings() {
  Name = "TeamCityTheatre",
  ManagedRuntimeVersion = NO_MANAGED_CODE,
  Autostart = true
};

var applicationSettings = new ApplicationSettings() {
  SiteName = "Default Web Site",
  ApplicationPool = "TeamCityTheatre",
  ApplicationPath = "/TeamCityTheatre",
  VirtualDirectory = "/",
  PhysicalDirectory = publishOutputFolderPath
};

Task("RemoveIISApplicationIfExists")
  .WithCriteria(() => SiteApplicationExists(applicationSettings))
  .Does(() => RemoveSiteApplication(applicationSettings));

Task("RemoveIISApplicationPoolIfExists")
  .IsDependentOn("RemoveIISApplicationIfExists")
  .WithCriteria(() => PoolExists(applicationPoolSettings.Name))
  .Does(() => { 
    StopPool(applicationPoolSettings.Name); 
    DeletePool(applicationPoolSettings.Name); 
  });

Task("CreateIISApplicationPool")
  .Description("Creates an application pool in IIS for TeamCityTheatre")
  .IsDependentOn("RemoveIISApplicationPoolIfExists")
  .Does(() => CreatePool(applicationPoolSettings));

Task("CreateIISApplication")
  .Description("Creates an application in IIS for TeamCityTheatre")
  .IsDependentOn("RemoveIISApplicationPoolIfExists")
  .IsDependentOn("Publish")
  .IsDependentOn("CreateIISApplicationPool")
  .Does(() => AddSiteApplication(applicationSettings));

RunTarget(target);