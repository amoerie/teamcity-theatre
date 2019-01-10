using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using RestSharp;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using TeamCityTheatre.Core.Options;

namespace TeamCityTheatre.Core.Client {
  public interface ITeamCityRestClientFactory {
    IRestClient Create(ConnectionOptions connectionOptions);
  }

  public class TeamCityRestClientFactory : ITeamCityRestClientFactory {
    public IRestClient Create(ConnectionOptions connectionOptions) {
      if (connectionOptions == null) throw new ArgumentNullException(nameof(connectionOptions));
      var client = new RestClient {
        BaseUrl = new Uri(new Uri(connectionOptions.Url), new Uri("httpAuth/app/rest", UriKind.Relative)),
        Authenticator = new HttpBasicAuthenticator(connectionOptions.Username, connectionOptions.Password),
      }.UseSerializer(new JsonNetSerializer());

      client.DefaultParameters.Add(new Parameter {Type = ParameterType.HttpHeader, Name = "Accept", Value = "application/json"});
      
      return client;
    }
  }

  public class JsonNetSerializer : IRestSerializer {
    readonly JsonSerializerSettings _jsonSerializerSettings;

    public JsonNetSerializer() {
      _jsonSerializerSettings = new JsonSerializerSettings {
        Converters = {
          new IsoDateTimeConverter { DateTimeFormat = "yyyyMMdd'T'HHmmsszzz" }
        }
      };
    }
    
    public string Serialize(object obj) => JsonConvert.SerializeObject(obj, _jsonSerializerSettings);

    public T Deserialize<T>(IRestResponse response) => JsonConvert.DeserializeObject<T>(response.Content, _jsonSerializerSettings);

    public string Serialize(Parameter parameter) => JsonConvert.SerializeObject(parameter.Value, _jsonSerializerSettings);

    public string[] SupportedContentTypes { get; } = {
      "application/json", "text/json", "text/x-json", "text/javascript", "*+json"
    };

    public string ContentType { get; set; } = "application/json";

    public DataFormat DataFormat { get; } = DataFormat.Json;
  }
}