namespace TeamCityTheatre.Core.Models {
  /*
   *  <build id="161679" buildTypeId="TrackPro22xMaster_ValidateInstaller" number="2.2.0.3160" status="SUCCESS" 
   *                     state="finished" branchName="master" defaultBranch="true" href="/httpAuth/app/rest/builds/id:161679" 
   *                     webUrl="http://vm64-teamcity:8001/viewLog.html?buildId=161679&buildTypeId=TrackPro22xMaster_ValidateInstaller" />
   */

  public interface IBasicBuild {
    int Id { get; }
    string BuildConfigurationId { get; }
    double? PercentageComplete { get; }
    double? ElapsedSeconds { get; }
    double? EstimatedTotalSeconds { get; }
    string CurrentStageText { get; }
    string Number { get; }
    BuildStatus Status { get; }
    string State { get; }
    string BranchName { get; }
    bool IsDefaultBranch { get; }
    string Href { get; }
    string WebUrl { get; }
  }
}