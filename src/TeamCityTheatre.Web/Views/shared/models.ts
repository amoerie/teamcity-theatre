import {Guid, IBasicBuildConfiguration, IBasicProject, ITile, IView} from "./contracts";
import {v4 as newguid } from "uuid";
import {move} from "./arrays/move";
import {mergeById} from "./arrays/mergeById";

interface IProjectConstructorParameters extends IBasicProject {
  parent?: Project | null,
  children?: Project[],
  buildConfigurations?: BuildConfiguration[] | null,
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
  buildConfigurations: BuildConfiguration[] | null;

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

  withBuildConfigurations(buildConfigurations: BuildConfiguration[]) {
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
  update(project: Project | null): Project {
    if (project === null) return this;
    if (this.id === project.id) return project; // if this is the project that was updated, return the new version
    return new Project({
      ...(this as Project),
      children: this.children.map(c => c.update(project))
    });
  }

  hasChildren() {
    return this.children.length > 0;
  }

  getLabel(): string {
    if (this.parent === null) return this.name;
    return [this.parent.getLabel(), this.name].join(" / ");
  }
}

export class BuildConfiguration {
  id: string;
  name: string;

  constructor(params: { id: string, name: string }) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromContract(buildConfiguration: IBasicBuildConfiguration) {
    return new BuildConfiguration(buildConfiguration);
  }
}

export class View {
  id: Guid;
  name: string;
  defaultNumberOfBranchesPerTile: number;
  numberOfColumns: number;
  tiles: Tile[];
  isEditing: boolean;

  constructor(params: { id: Guid, name: string, defaultNumberOfBranchesPerTile: number, numberOfColumns: number, tiles: Tile[], isEditing?: boolean }) {
    this.id = params.id;
    this.name = params.name;
    this.defaultNumberOfBranchesPerTile = params.defaultNumberOfBranchesPerTile;
    this.numberOfColumns = params.numberOfColumns;
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
      defaultNumberOfBranchesPerTile: defaultNumberOfBranchesPerTile
    });
  }

  withNumberOfColumns(numberOfColumns: number) {
    return new View({
      ...(this as View),
      numberOfColumns: numberOfColumns
    });
  }

  withIsEditing(isEditing: boolean) {
    return new View({
      ...(this as View),
      isEditing: isEditing
    });
  }

  /**
   * Moves a single tile from the old index to the new index
   * @param oldIndex
   * @param newIndex
   */
  moveTile(oldIndex: number, newIndex: number) : View {
    return new View({
      ...(this as View),
      tiles: move(oldIndex, newIndex, this.tiles)
    })
  }

  /**
   * Replaces an old tile with the updated version
   */
  withTile(tile: Tile) {
    return new View({
      ...(this as View),
      tiles: mergeById(tile, this.tiles)
    });
  }

  /**
   * Removes a tile
   */
  withoutTile(tile: Tile) {
    return new View({
      ...(this as View),
      tiles: this.tiles.filter(t => t.id !== tile.id)
    });
  }

  static fromContract(view: IView) {
    return new View({
      id: view.id,
      name: view.name,
      defaultNumberOfBranchesPerTile: view.defaultNumberOfBranchesPerTile,
      numberOfColumns: view.numberOfColumns,
      tiles: view.tiles.map(Tile.fromContract)
    })
  }

  static newView() {
    return new View({
      id: newguid(),
      name: "New view",
      defaultNumberOfBranchesPerTile : 3,
      numberOfColumns: 6,
      tiles: [],
      isEditing: true
    })
  }
}

export class Tile {
  id: Guid;
  label: string;
  buildConfigurationId: string;
  buildConfigurationDisplayName: string;
  isEditing : boolean;

  constructor(params: { id: Guid, label: string, buildConfigurationId: string, buildConfigurationDisplayName: string, isEditing? : boolean }) {
    this.id = params.id;
    this.label = params.label;
    this.buildConfigurationId = params.buildConfigurationId;
    this.buildConfigurationDisplayName = params.buildConfigurationDisplayName;
    this.isEditing = typeof params.isEditing === "undefined" ? false : params.isEditing;
  }

  withLabel(label: string) {
    return new Tile({
      ...(this as Tile),
      label: label
    });
  }

  withIsEditing(isEditing: boolean) {
    return new Tile({
      ...(this as Tile),
      isEditing: isEditing
    });
  }

  static fromContract(tile: ITile) {
    return new Tile(tile);
  }

  static newTile(project: Project, buildConfiguration: BuildConfiguration) {
    return new Tile({
      id: newguid(),
      label: buildConfiguration.name,
      buildConfigurationId : buildConfiguration.id,
      buildConfigurationDisplayName : [project.getLabel(), buildConfiguration.name].join(" / ")
    });
  }
}