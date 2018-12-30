using System.IO;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using TeamCityTheatre.Core.ApplicationModels;
using TeamCityTheatre.Core.Options;

namespace TeamCityTheatre.Core.Repositories {
  public interface IConfigurationRepository {
    Configuration GetConfiguration();
    void SaveConfiguration(Configuration configuration);
  }

  public class ConfigurationRepository : IConfigurationRepository {
    readonly DirectoryInfo _workspace;
    readonly FileInfo _configurationFile;

    public ConfigurationRepository(IOptionsSnapshot<StorageOptions> storageOptionsSnapshot) {
      var storageOptions = storageOptionsSnapshot.Value;
      _configurationFile = new FileInfo(storageOptions.ConfigurationFile);
      _workspace = _configurationFile.Directory;
    }

    public Configuration GetConfiguration() {
      if(!File.Exists(_configurationFile.FullName))
        return new Configuration();
      var configurationFileContents = File.ReadAllText(_configurationFile.FullName);
      return JsonConvert.DeserializeObject<Configuration>(configurationFileContents);
    }

    public void SaveConfiguration(Configuration configuration) {
      if (!_workspace.Exists) _workspace.Create();
      
      var configurationFileContents = JsonConvert.SerializeObject(configuration, Formatting.Indented);
      
      File.WriteAllText(_configurationFile.FullName, configurationFileContents);
    }
  }
}