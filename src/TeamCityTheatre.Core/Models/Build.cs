using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace TeamCityTheatre.Core.Models {
  public class Build : IDetailedBuild {
    public int Id { get; set; }
    public string BuildConfigurationId { get; set; }
    public double? PercentageComplete { get; set; }
    public double? ElapsedSeconds { get; set; }
    public double? EstimatedTotalSeconds { get; set; }
    public string CurrentStageText { get; set; }
    public string Number { get; set; }
    public BuildStatus Status { get; set; }
    public string State { get; set; }
    public string BranchName { get; set; }
    public bool IsDefaultBranch { get; set; }
    public string Href { get; set; }
    public string WebUrl { get; set; }
    public string StatusText { get; set; }
    public IBasicBuildConfiguration BuildConfiguration { get; set; }
    public DateTime QueuedDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime FinishDate { get; set; }
    public IReadOnlyCollection<IDetailedBuildChange> LastChanges { get; set; }
    public IBasicAgent Agent { get; set; }
    public IReadOnlyCollection<Property> Properties { get; set; }
    public IReadOnlyCollection<IBasicBuild> SnapshotDependencies { get; set; }
    public IReadOnlyCollection<IBasicBuild> ArtifactDependencies { get; set; }

    public override string ToString() {
      return string.Format("Id: {0}, BuildConfigurationId: {1}, Number: {2}, Status: {3}, State: {4}", Id,
        BuildConfigurationId, Number, Status, State);
    }
  }
}