using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RestSharp;
using TeamCityTheatre.Core.Client;
using TeamCityTheatre.Core.Client.Mappers;
using TeamCityTheatre.Core.Client.Responses;
using TeamCityTheatre.Core.Models;

namespace TeamCityTheatre.Core.DataServices {
  public class BuildDataService : IBuildDataService {
    readonly ITeamCityClient _teamCityClient;
    readonly IBuildMapper _buildMapper;

    public BuildDataService(ITeamCityClient teamCityClient, IBuildMapper buildMapper) {
      _teamCityClient = teamCityClient ?? throw new ArgumentNullException(nameof(teamCityClient));
      _buildMapper = buildMapper ?? throw new ArgumentNullException(nameof(buildMapper));
    }

    public async Task<IEnumerable<IDetailedBuild>> GetBuildsOfBuildConfigurationAsync(string buildConfigurationId, int count = 100) {
      var request = new RestRequest("builds/?locator=branch:(default:any,policy:active_history_and_active_vcs_branches),running:any,count:{count},buildType:(id:{buildConfigurationId})" +
                                    "&fields=count,build(id,buildTypeId,number,status,state,percentageComplete,branchName,defaultBranch,href,webUrl," +
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