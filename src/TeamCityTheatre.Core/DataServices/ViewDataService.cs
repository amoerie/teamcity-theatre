using System;
using System.Collections.Generic;
using System.Linq;
using TeamCityTheatre.Core.ApplicationModels;
using TeamCityTheatre.Core.Repositories;

namespace TeamCityTheatre.Core.DataServices {
  public class ViewDataService : IViewDataService {
    readonly IConfigurationRepository _configurationRepository;

    public ViewDataService(IConfigurationRepository configurationRepository) {
      _configurationRepository = configurationRepository ?? throw new ArgumentNullException(nameof(configurationRepository));
    }

    public IEnumerable<View> GetAllViews() {
      return _configurationRepository.GetConfiguration().Views;
    }

    public View GetViewById(Guid id) {
      return GetAllViews().SingleOrDefault(v => v.Id == id);
    }

    public View GetViewByName(string name) {
      return GetAllViews().SingleOrDefault(v => string.Equals(v.Name, name, StringComparison.OrdinalIgnoreCase));
    }

    public View SaveView(View view) {
      if (view.Id == default(Guid)) view.Id = Guid.NewGuid();
      foreach (var tile in view.Tiles.Where(tile => tile.Id == default(Guid))) tile.Id = Guid.NewGuid();
      var configuration = _configurationRepository.GetConfiguration();
      configuration.Views = configuration.Views.Select(v => v.Id == view.Id ? view : v).ToList();
      _configurationRepository.SaveConfiguration(configuration);
      return view;
    }

    public void DeleteView(View view) {
      var configuration = _configurationRepository.GetConfiguration();
      configuration.Views = configuration.Views.Where(v => v.Id != view.Id);
      _configurationRepository.SaveConfiguration(configuration);
    }
  }
}