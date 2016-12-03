using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RestSharp;
using TeamCityTheatre.Core.Client;
using TeamCityTheatre.Core.Client.Mappers;
using TeamCityTheatre.Core.Client.Responses;
using TeamCityTheatre.Core.DataServices;
using TeamCityTheatre.Core.Models;

namespace TeamCityTheatre.Application.DataServices {
  public class BuildDataService : IBuildDataService{
    private readonly ITeamCityClient _teamCityClient;
    private readonly IBuildMapper _buildMapper;

    public BuildDataService(ITeamCityClient teamCityClient, IBuildMapper buildMapper) {
      if (teamCityClient == null) {
        throw new ArgumentNullException(nameof(teamCityClient));
      }
      if (buildMapper == null) {
        throw new ArgumentNullException(nameof(buildMapper));
      }
      _teamCityClient = teamCityClient;
      _buildMapper = buildMapper;
    }

    public async Task<IEnumerable<IDetailedBuild>> GetBuildsOfBuildConfigurationAsync(string buildConfigurationId, int count = 100) {
      var request = new RestRequest("builds/?locator=branch:(default:any),running:any,count:{count},buildType:(id:{buildConfigurationId})" +
                                    "&fields=count,build(id,buildTypeId,number,status,StatusText,state,percentageComplete,branchName,href,webUrl," +
                                    "running-info(percentageComplete,elapsedSeconds,estimatedTotalSeconds,currentStageText),queuedDate,startDate,finishDate)");
      request.AddUrlSegment("count", Convert.ToString(count));
      request.AddUrlSegment("buildConfigurationId", buildConfigurationId);
      var response = await _teamCityClient.ExecuteRequestAsync<BuildsResponse>(request);
      return _buildMapper.Map(response);
    }

    public async Task<IDetailedBuild> GetBuildDetailsAsync(int buildId) {
      var request = new RestRequest("builds/id:{buildId}");
      request.AddUrlSegment("buildId", Convert.ToString(buildId));
      var response = await _teamCityClient.ExecuteRequestAsync<BuildResponse>(request);
      return _buildMapper.Map(response);
    }
  }
}
