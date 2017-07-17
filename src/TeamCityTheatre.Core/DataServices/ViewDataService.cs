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
      var configuration = _configurationRepository.GetConfiguration();
      var views = configuration.Views.ToList();
      var index = views.FindIndex(v => v.Id == view.Id);
      if (index > -1) {
        views[index] = view;
      } else {
        views.Add(view);
      }
      configuration.Views = views;
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