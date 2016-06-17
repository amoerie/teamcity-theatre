using System;

namespace TeamCityTheatre.Core.Client.Responses {
  public class BuildResponse {
    public int Id { get; set; }
    public string BuildTypeId { get; set; }
    public string Number { get; set; }
    public string Status { get; set; }
    public string State { get; set; }
    public double? PercentageComplete { get; set; }
    public string BranchName { get; set; }
    public bool DefaultBranch { get; set; }
    public string Href { get; set; }
    public string WebUrl { get; set; }
    public string StatusText { get; set; }
    public RunningInfoResponse RunningInfo { get; set; }
    public BuildTypeResponse BuildType { get; set; }
    public DateTime QueuedDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime FinishDate { get; set; }
    public BuildChangesResponse LastChanges { get; set; }
    public AgentResponse Agent { get; set; }
    public PropertiesResponse Properties { get; set; }
    public BuildsResponse SnapshotDependencies { get; set; }
    public BuildsResponse ArtifactDependencies { get; set; }
  }
}