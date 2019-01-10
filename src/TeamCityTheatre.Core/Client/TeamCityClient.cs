using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using RestSharp;
using Serilog;
using TeamCityTheatre.Core.Options;

namespace TeamCityTheatre.Core.Client {
  public interface ITeamCityClient {
    Task<TResponse> ExecuteRequestAsync<TResponse>(IRestRequest restRequest) where TResponse : new();
  }

  public class LoggingTeamCityClient<T> : ITeamCityClient where  T: class, ITeamCityClient {
    readonly T _inner;
    readonly ILogger _logger;

    public LoggingTeamCityClient(ILogger logger, T inner) {
      _logger = logger.ForContext<T>() ?? throw new ArgumentNullException(nameof(logger));
      _inner = inner ?? throw new ArgumentNullException(nameof(inner));
    }

    public async Task<TResponse> ExecuteRequestAsync<TResponse>(IRestRequest request) where TResponse : new() {
      var parameters = string.Join(", ", request.Parameters.Select(p => $"{p.Name} = {p.Value}"));
      _logger.Verbose("[REQUEST ] {Method} {Url} with parameters {Parameters}", request.Method, request.Resource, parameters);
      var response = await _inner.ExecuteRequestAsync<TResponse>(request);
      _logger.Verbose("[RESPONSE] {@Data}", response);
      return response;
    }
  }

  public class TeamCityClient : ITeamCityClient {
    readonly IRestClient _client;
    readonly IResponseValidator _responseValidator;
    readonly ITeamCityRequestPreparer _teamCityRequestPreparer;
    readonly ILogger _logger;

    public TeamCityClient(
      ITeamCityRestClientFactory teamCityRestClientFactory, IOptionsSnapshot<ConnectionOptions> connectionOptionsSnapshot,
      IResponseValidator responseValidator, ITeamCityRequestPreparer teamCityRequestPreparer,
      ILogger logger) {
      if (connectionOptionsSnapshot == null) throw new ArgumentNullException(nameof(connectionOptionsSnapshot));
      if (logger == null) throw new ArgumentNullException(nameof(logger));
      var connectionOptions = connectionOptionsSnapshot.Value;
      _responseValidator = responseValidator ?? throw new ArgumentNullException(nameof(responseValidator));
      _teamCityRequestPreparer = teamCityRequestPreparer ?? throw new ArgumentNullException(nameof(teamCityRequestPreparer));
      _logger = logger;
      _client = teamCityRestClientFactory?.Create(connectionOptions) ?? throw new ArgumentNullException(nameof(teamCityRestClientFactory));
    }

    public async Task<TResponse> ExecuteRequestAsync<TResponse>(IRestRequest restRequest) where TResponse : new() {
      _teamCityRequestPreparer.Prepare(restRequest);
      var taskCompletionSource = new TaskCompletionSource<IRestResponse<TResponse>>();
      _client.ExecuteAsync<TResponse>(restRequest, restResponse => {
        if (restResponse.ErrorException != null) {
          try {
            var responseContent = System.Text.Encoding.UTF8.GetString(restResponse.RawBytes);
            _logger.Error(restResponse.ErrorException, "Error response from TeamCity: {status} {responseContent}", restResponse.StatusCode, responseContent);
          } catch (Exception e) {
            var aggregateException = new AggregateException(restResponse.ErrorException, e);
            _logger.Error(aggregateException, "Error when calling TeamCity {status}", restResponse.StatusCode);
          } finally {
            taskCompletionSource.SetException(new Exception("Failed to make request to the TeamCity server", restResponse.ErrorException));
          }
        } else {
          taskCompletionSource.SetResult(restResponse);
        }
      });
      var responseTask = taskCompletionSource.Task;
      var response = await responseTask;
      _responseValidator.Validate(response);
      return response.Data;
    }
  }
}