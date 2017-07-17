import {ChangeEvent, createElement} from "react";
import {SortableContainer, SortableElement, SortableHandle, SortEnd} from "react-sortable-hoc";
import {Tile, View} from "../shared/models";
import {updateView} from "./settings.observables.views";
import {saveView} from "./settings.observables.saved-view";
import {stopPropagation} from "../shared/events/stopPropagation";
import {onEnter} from "../shared/events/onEnter";

export const handleOnSortEnd = (view: View) => (sort: SortEnd) => saveView(updateView(view.moveTile(sort.oldIndex, sort.newIndex)));

export const SelectedView = (props: { selectedView: View | null }) => {
  const {selectedView} = props;
  if (selectedView === null) return <div />;
  return (
    <div id="selected-view-wrapper">
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title"><h2>Tiles of {selectedView.name}</h2></div>
        </div>
        <div className="panel-body"/>
        <TilesList view={selectedView} useDragHandle={true} axis="y" lockAxis="y"
                   onSortEnd={handleOnSortEnd(selectedView)} helperClass="tile-drag-helper"/>
      </div>
    </div>
  );
};

const TilesList = SortableContainer<{ view: View }>((props: { view: View }) => {
  const {view} = props;
  return (
    <ul className="tiles-list list-group">
      {view.tiles.map((t, index) => <TileRow view={view} tile={t} index={index}/>)}
    </ul>
  );
});

const TileDragHandle = SortableHandle(() => <div><i className="fa fa-bars"/></div>);

const TileRow = SortableElement<{ view: View, tile: Tile }>((props: { view: View, tile: Tile }) => {
  const {view, tile} = props;
  return (
    <li className="tile list-group-item"
        onDoubleClick={() => updateView(view.withTile(tile.withIsEditing(true)))}>
      <div className="tile-drag-handle">
        <TileDragHandle />
      </div>
      <div className="tile-label">
        <TileLabel {...props} />
      </div>
      <div className="tile-build-configuration">
        <TileBuildConfiguration {...props} />
      </div>
      <div className="tile-actions">
        <TileActions {...props}/>
      </div>
    </li>
  );
});

const TileLabel = (props: { view: View, tile: Tile }) => {
  const {view, tile} = props;
  if (tile.isEditing) {
    return <input type="text"
                  name="tile-label-input"
                  className="form-control"
                  value={tile.label}
                  onClick={stopPropagation}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateView(view.withTile(tile.withLabel(e.currentTarget.value)))}
                  onKeyUp={onEnter(() => saveView(view))}
                  autoFocus />
  }
  return <span>{tile.label}</span>
};

const TileBuildConfiguration = (props: { view: View, tile: Tile }) => {
  const {tile} = props;
  return <span>{tile.buildConfigurationDisplayName}</span>;
};

const TileActions = (props: { view: View, tile: Tile }) => {
  const {tile} = props;
  if (tile.isEditing)
    return <div><SaveTileButton {...props} /></div>;
  return <div>
    <EditTileButton {...props}/> <DeleteTileButton {...props}/>
  </div>
};

const handleSaveTileButtonClick = (view: View) => (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
  saveView(view);
};

const SaveTileButton = (props: { view: View }) => {
  return (
    <button className="save-tile-button btn btn-success" onClick={handleSaveTileButtonClick(props.view)} title="Save">
      <i className="fa fa-check"/>
    </button>
  );
};

const handleEditTileButtonClick = (view: View, tile: Tile) => () => updateView(view.withTile(tile.withIsEditing(true)));

const EditTileButton = (props: { view: View, tile: Tile }) => {
  const {view, tile} = props;
  return (
    <button className="edit-tile-button btn btn-default" onClick={handleEditTileButtonClick(view, tile)} title="Edit">
      <i className="fa fa-pencil"/>
    </button>
  );
};

const handleDeleteTileButtonClick = (view: View, tile: Tile) => () => saveView(updateView(view.withoutTile(tile)));

const DeleteTileButton = (props: { view: View, tile: Tile }) => {
  const {view, tile} = props;
  return (
    <button className="delete-tile-button btn btn-danger" onClick={handleDeleteTileButtonClick(view, tile)}
            title="Delete">
      <i className="fa fa-remove"/>
    </button>
  );
};