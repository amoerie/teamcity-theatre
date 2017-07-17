import {Guid, IBasicBuildConfiguration, IBasicProject, ITile, IView} from "./contracts";

interface IProjectConstructorParameters extends IBasicProject {
  parent? : Project | null,
  children?: Project[],
  buildConfigurations?: IBasicBuildConfiguration[] | null,
  isExpanded?: boolean
}

export class Project {
  isArchived: boolean;
  href: string;
  id: string;
  name: string;
  description: string | null;
  webUrl: string;
  parent: Project | null;
  parentProjectId: string | null;
  children: Project[];
  isExpanded: boolean;
  buildConfigurations: IBasicBuildConfiguration[] | null;

  constructor(params: IProjectConstructorParameters) {
    if (!params) throw new Error("Invalid constructor parameters: " + JSON.stringify(params));
    this.isArchived = params.isArchived;
    this.href = params.href;
    this.id = params.id;
    this.name = params.name;
    this.description = params.description;
    this.webUrl = params.webUrl;
    this.parentProjectId = params.parentProjectId;

    this.parent = typeof params.parent === "undefined" ? null : params.parent;
    this.children = typeof params.children === "undefined" ? [] : params.children;
    this.buildConfigurations = typeof params.buildConfigurations === "undefined" ? [] : params.buildConfigurations;
    this.isExpanded = typeof params.isExpanded === "undefined" ? false : params.isExpanded;
  }

  setChildren(children: Project[]): void {
    // Building immutable trees is hard if the input is not topologically sorted.
    // Avoid problems by doing only this little thing in a mutable way
    this.children = children;
    this.children.forEach(c => c.parent = this);
  }

  withBuildConfigurations(buildConfigurations: IBasicBuildConfiguration[]) {
    return new Project({
      ...(this as Project),
      buildConfigurations: buildConfigurations
    });
  }

  expand() {
    return new Project({
      ...(this as Project),
      isExpanded: true
    });
  }

  collapse() {
    return new Project({
      ...(this as Project),
      isExpanded: false
    });
  }

  toggleExpandOrCollapse() {
    return this.isExpanded ? this.collapse() : this.expand();
  }

  // propagate updates to a project down the chain
  update(project: Project): Project {
    if (this.id === project.id) return project; // if this is the project that was updated, return the new version
    return new Project({
      ...(this as Project),
      children: this.children.map(c => c.update(project))
    });
  }

  hasChildren() {
    return this.children.length > 0;
  }

  getLabel() : string {
    if(this.parent === null) return this.name;
    return [this.parent.getLabel(), this.name].join(" / ");
  }
}

export class View {
  id: Guid;
  name: string;
  defaultNumberOfBranchesPerTile: number;
  tiles: Tile[];
  isEditing: boolean;

  constructor(params: { id: Guid, name: string, defaultNumberOfBranchesPerTile: number, tiles: Tile[], isEditing? : boolean }) {
    this.id = params.id;
    this.name = params.name;
    this.defaultNumberOfBranchesPerTile = params.defaultNumberOfBranchesPerTile;
    this.tiles = params.tiles;
    this.isEditing = typeof params.isEditing == "undefined" ? false : params.isEditing;
  }

  withName(name: string) {
    return new View({
      ...(this as View),
      name: name
    });
  }

  withDefaultNumberOfBranchesPerTile(defaultNumberOfBranchesPerTile: number) {
    return new View({
      ...(this as View),
      defaultNumberOfBranchesPerTile : defaultNumberOfBranchesPerTile
    });
  }

  withIsEditing(isEditing: boolean) {
    return new View({
      ...(this as View),
      isEditing : isEditing
    });
  }

  static fromContract(view: IView) {
    return new View({
      id: view.id,
      name: view.name,
      defaultNumberOfBranchesPerTile: view.defaultNumberOfBranchesPerTile,
      tiles: view.tiles.map(Tile.fromContract)
    })
  }
}

export class Tile {
  id: Guid;
  label: string;
  buildConfigurationId: string;
  buildConfigurationDisplayName: string;

  constructor(params: { id: Guid, label: string, buildConfigurationId: string, buildConfigurationDisplayName: string }) {
    this.id = params.id;
    this.label = params.label;
    this.buildConfigurationId = params.buildConfigurationId;
    this.buildConfigurationDisplayName = params.buildConfigurationDisplayName;
  }

  static fromContract(tile: ITile) {
    return new Tile(tile);
  }
}