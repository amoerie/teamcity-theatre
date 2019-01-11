export type Guid = string;

export interface IView {
  id: Guid;
  name: string;
  defaultNumberOfBranchesPerTile: number;
  numberOfColumns: number;
  tiles: ITile[];
}

export interface ITile {
  id: Guid;
  label: string;
  buildConfigurationId: string;
  buildConfigurationDisplayName: string;
}

export interface IViewData {
  id: Guid;
  tiles: ITileData[];
}

export interface ITileData {
  id: Guid;
  label: string;
  builds: IDetailedBuild[];
  combinedBuildStatus: BuildStatus;
}

export interface IBasicBuild {
  id: string;
  buildConfigurationId: string;
  percentageComplete: number;
  elapsedSeconds: number;
  estimatedTotalSeconds: number;
  currentStageText: string;
  number: string;
  status: BuildStatus;
  state: string;
  branchName: string;
  isDefaultBranch: boolean;
  href: string;
  webUrl: string;
}

export interface IDetailedBuild extends IBasicBuild {
  statusText: string;
  buildConfiguration: IBasicBuildConfiguration;
  queuedDate: string;
  startDate: string;
  finishDate: string;
  lastChanges: IDetailedBuildChange[];
  agent: IBasicAgent;
  properties: IPropery[];
  snapshotDependencies: IBasicBuild[];
  artifactDependencies: IBasicBuild[];
}

export enum BuildStatus {
  Unknown,
  Success,
  Failure,
  Error
}

export interface IBasicBuildConfiguration {
  id: string;
  name: string;
  projectId: string;
  href: string;
  webUrl: string;
}

export interface IDetailedBuildChange {
  id: string;
  version: string;
  username: string;
  date: string;
  href: string;
  webLink: string;
}

export interface IBasicAgent {
  id: string;
  name: string;
  typeId: string;
  href: string;
}

export interface IPropery {
  name: string;
  value: string;
}

export interface IBasicProject {
  isArchived: boolean;
  href: string;
  id: string;
  name: string;
  description: string | null;
  webUrl: string;
  parentProjectId: string | null;
}

export interface IDetailedProject extends IBasicProject {
  parentProject: IBasicProject
  buildConfigurations: IBasicBuildConfiguration[];
}