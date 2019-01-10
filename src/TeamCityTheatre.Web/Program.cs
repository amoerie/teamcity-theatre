using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RestSharp.Validation;
using Serilog;
using TeamCityTheatre.Core.Options;

namespace TeamCityTheatre.Web {
  public class Program {
    public static void Main(string[] args) {
      var environment = Environment();
      var configuration = BuildConfiguration(args, environment);
      var logger = BuildLogger(configuration);

      ValidateConfiguration(configuration, logger);

      BuildWebHost(args, configuration, logger).Run();
    }

    public static IWebHost BuildWebHost(string[] args, IConfiguration configuration, ILogger logger) {
      return new WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(Directory.GetCurrentDirectory())
        .UseConfiguration(configuration)
        .UseIISIntegration()
        .CaptureStartupErrors(true)
        .UseSetting(WebHostDefaults.DetailedErrorsKey, "True")
        .UseDefaultServiceProvider((context, options) => options.ValidateScopes = context.HostingEnvironment.IsDevelopment())
        .UseSerilog(logger, dispose: true)
        .ConfigureServices(sc => sc.AddSingleton(logger))
        .UseStartup<Startup>()
        .Build();
    }

    static ILogger BuildLogger(IConfiguration configuration) => new LoggerConfiguration()
      .ReadFrom.Configuration(configuration)
      .CreateLogger();

    static IConfigurationRoot BuildConfiguration(string[] args, string environment) {
      var config = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory());

      config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

      config.AddEnvironmentVariables("TEAMCITYTHEATRE_");

      if (args != null) {
        config.AddCommandLine(args);
      }

      return config.Build();
    }

    static string Environment() => System.Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
                                   ?? EnvironmentName.Production;

    static void ValidateConfiguration(IConfiguration configuration, ILogger logger) {
      var teamCityConnection = configuration.GetSection("Connection").Get<ConnectionOptions>();
      if (teamCityConnection == null) {
        throw new Exception("There is no 'Connection' configuration section present, neither in appsettings.json or via environment variables!");
      }

      if (string.IsNullOrEmpty(teamCityConnection.Url)) {
        throw new Exception("Connection.Url is not present");
      }

      if (string.IsNullOrEmpty(teamCityConnection.Username)) {
        throw new Exception("Connection.Username is not present");
      }

      if (string.IsNullOrEmpty(teamCityConnection.Password)) {
        throw new Exception("Connection.Password is not present");
      }

      logger.Information("Using TeamCity server   : "
                         + teamCityConnection.Url);
      logger.Information("Using TeamCity user     : "
                         + teamCityConnection.Username);
      logger.Information("Using TeamCity password : "
                         + teamCityConnection.Password[0]
                         + new string(teamCityConnection.Password.Skip(1).Select(_ => '*').ToArray()));
    }
  }
}