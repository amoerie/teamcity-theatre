namespace TeamCityTheatre.Core.Options {
  public class ConnectionOptions {
    public string Url { get; set; }
    public AuthenticationMode AuthenticationMode { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string AccessToken { get; set; }
  }

  public enum AuthenticationMode {
    AccessToken,
    BasicAuthentication,
    Guest
  }
}