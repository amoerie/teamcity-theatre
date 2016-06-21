using System;
using System.Collections.Generic;

namespace TeamCityTheatre.Core.Models
{
    /*
    sample:
  {
    "id": 212673,
    "buildTypeId": "Pro_ProMaster_Compile",
    "number": "6.11.0.4856",
    "status": "FAILURE",
    "state": "finished",
    "branchName": "develop",
    "href": "/httpAuth/app/rest/builds/id:212673",
    "webUrl": "http://vm64-teamcity:8001/viewLog.html?buildId=212673&buildTypeId=Pro_ProMaster_Compile",
    "statusText": "Compilation error: UltraGendaPro.Patients\src\UltraGendaPro.Patients.WebApi\UltraGendaPro.Patients.WebApi.csproj (new)",
    "buildType": {
      "id": "Pro_ProMaster_Compile",
      "name": "Compile",
      "projectName": "Pro :: Pro Git",
      "projectId": "Pro_ProMaster",
      "href": "/httpAuth/app/rest/buildTypes/id:Pro_ProMaster_Compile",
      "webUrl": "http://vm64-teamcity:8001/viewType.html?buildTypeId=Pro_ProMaster_Compile"
    },
    "queuedDate": "20150914T093735+0200",
    "startDate": "20150914T093741+0200",
    "finishDate": "20150914T094913+0200",
    "triggered": {
      "type": "buildType",
      "date": "20150914T093735+0200",
      "user": {
        "username": "nassereb",
        "name": "Nassere Besseghir",
        "id": 14,
        "href": "/httpAuth/app/rest/users/id:14"
      },
      "buildType": {
        "id": "Pro_ProMaster_Create64bitInstaller",
        "name": "Create 64bit Installer",
        "projectName": "Pro :: Pro Git",
        "projectId": "Pro_ProMaster",
        "href": "/httpAuth/app/rest/buildTypes/id:Pro_ProMaster_Create64bitInstaller",
        "webUrl": "http://vm64-teamcity:8001/viewType.html?buildTypeId=Pro_ProMaster_Create64bitInstaller"
      }
    },
    "lastChanges": {
      "count": 1,
      "change": [
        {
          "id": 78420,
          "version": "7f88ba007daa401a91baec180c16b1798dceff0e",
          "username": "nbesseghir",
          "date": "20150914T093624+0200",
          "href": "/httpAuth/app/rest/changes/id:78420",
          "webUrl": "http://vm64-teamcity:8001/viewModification.html?modId=78420&personal=false"
        }
      ]
    },
    "changes": {
      "href": "/httpAuth/app/rest/changes?locator=build:(id:212673)"
    },
    "revisions": {
      "count": 1,
      "revision": [
        {
          "version": "7f88ba007daa401a91baec180c16b1798dceff0e",
          "vcs-root-instance": {
            "id": "538",
            "vcs-root-id": "Pro_Git",
            "name": "Pro_Git",
            "href": "/httpAuth/app/rest/vcs-root-instances/id:538"
          }
        }
      ]
    },
    "agent": {
      "id": 8,
      "name": "VM-BUILDAGENT5",
      "typeId": 8,
      "href": "/httpAuth/app/rest/agents/id:8"
    },
    "problemOccurrences": {
      "count": 2,
      "href": "/httpAuth/app/rest/problemOccurrences?locator=build:(id:212673)",
      "newFailed": 2,
      "default": false
    },
    "artifacts": {
      "href": "/httpAuth/app/rest/builds/id:212673/artifacts/children/"
    },
    "relatedIssues": {
      "href": "/httpAuth/app/rest/builds/id:212673/relatedIssues"
    },
    "properties": {
      "count": 8,
      "property": [
        {
          "name": "ProjectBuildNumber",
          "value": "6.8.1"
        },
        {
          "name": "SupportedProductVersionBuildNumber1",
          "value": "6.7.2"
        },
        {
          "name": "SupportedProductVersionBuildNumber2",
          "value": "6.6.5"
        },
        {
          "name": "system.PreviousSupportedReleaseVersion1",
          "value": "%SupportedProductVersionBuildNumber1%"
        },
        {
          "name": "system.PreviousSupportedReleaseVersion2",
          "value": "%SupportedProductVersionBuildNumber2%"
        },
        {
          "name": "system.UltraGendaProVersion",
          "value": "%env.BUILD_NUMBER%"
        },
        {
          "name": "TestServer_X64",
          "value": "VM-PRO-TEST64"
        },
        {
          "name": "TestServer_X86",
          "value": "VM-PRO-TEST32"
        }
      ]
    },
    "statistics": {
      "href": "/httpAuth/app/rest/builds/id:212673/statistics"
    }
  }
     */

    public interface IDetailedBuild : IBasicBuild
    {
        string StatusText { get; }
        IBasicBuildConfiguration BuildConfiguration { get; }
        DateTime QueuedDate { get; }
        DateTime StartDate { get; }
        DateTime FinishDate { get; }
        IReadOnlyCollection<IDetailedBuildChange> LastChanges { get; }
        IBasicAgent Agent { get; }
        IReadOnlyCollection<Property> Properties { get; }
        IReadOnlyCollection<IBasicBuild> SnapshotDependencies { get; }
        IReadOnlyCollection<IBasicBuild> ArtifactDependencies { get; }
        //int FailedTestCount { get; }
        //int IgnoredTestCount { get; }
        //int PassedTestCount { get; }
        //int SuccessRate { get; }
        //int TimeSpentInQueue { get; }
        //int TotalTestCount { get; }
    }
}