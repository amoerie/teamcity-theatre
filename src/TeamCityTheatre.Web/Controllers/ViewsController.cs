using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TeamCityTheatre.Core.ApplicationModels;
using TeamCityTheatre.Core.DataServices;

namespace TeamCityTheatre.Web.Controllers {
  [Route("api/views")]
  public class ViewsController : Controller {
    readonly IViewDataService _viewDataService;

    public ViewsController(IViewDataService viewDataService) {
      _viewDataService = viewDataService ?? throw new ArgumentNullException(nameof(viewDataService));
    }

    [HttpGet("")]
    public IEnumerable<View> Get() {
      return _viewDataService.GetAllViews();
    }

    [HttpGet("{id:guid}")]
    public View Get(Guid id) {
      return _viewDataService.GetViewById(id);
    }

    [HttpGet("{name}")]
    public View Get(string name) {
      return _viewDataService.GetViewByName(name);
    }

    [HttpPost("")]
    public View Post([FromBody] View view) {
      return _viewDataService.SaveView(view);
    }

    [HttpDelete("{id}")]
    public void Delete(Guid id) {
      var view = _viewDataService.GetViewById(id);
      if (view != null) {
        _viewDataService.DeleteView(view);
      }
    }
  }
}