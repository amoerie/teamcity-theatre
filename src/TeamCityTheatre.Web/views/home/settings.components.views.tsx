import {ChangeEvent, createElement} from "react";
import {View} from "../shared/models";
import {selectView} from "./settings.observables.selected-view";
import {updateView} from "./settings.observables.views";
import {saveView} from "./settings.observables.saved-view";
import {onEnter} from "../shared/events/onEnter";
import {stopPropagation} from "../shared/events/stopPropagation";

export const Views = (props: { views: View[] | null, selectedView: View | null }) => {
  if (props.views === null) return (
    <div>
      <i className="fa fa-spin fa-cog"/> Loading views
    </div>
  );
  return (
    <div id="views-wrapper">
      <div className="panel panel-primary">
        <div className="panel-heading"><h2>Views</h2></div>
        <div className="panel-body">
          <div><CreateViewButton /></div>
        </div>
        <ViewsTable views={props.views} selectedView={props.selectedView}/>
      </div>
    </div>
  );
};

const handleCreateViewButtonClick = () => updateView(View.newView());

const CreateViewButton = (props: {}) => (
  <button className="add-view-button btn btn-success" onClick={handleCreateViewButtonClick}>
    <i className="fa fa-plus"/> Create a new view
  </button>
);

const ViewsTable = (props: { views: View[], selectedView: View | null }) => {
  return (
    <table id="views-table" className="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th># Branches per tile</th>
        <th/>
      </tr>
      </thead>
      <tbody>{ props.views.map(view => <ViewRow view={view} selectedView={props.selectedView}/>) }</tbody>
    </table>
  );
};

const ViewRow = (props: { view: View, selectedView: View | null }) => {
  const isSelected = props.view === props.selectedView;

  const selectedClassName = isSelected ? "selected" : "";
  return (
    <tr className={`view ${selectedClassName}`}
        onClick={() => selectView(props.view) }
        onDoubleClick={() => updateView(props.view.withIsEditing(true))}>
      <td className="view-name">
        <ViewName view={props.view} />
      </td>
      <td className="view-branches-per-tile">
        <DefaultNumberOfBranchesPerTile view={props.view} />
      </td>
      <td>
        { props.view.isEditing ? <SaveViewButton view={props.view} /> : <EditViewButton view={props.view}/> } <DeleteViewButton view={props.view}/>
      </td>
    </tr>
  );
};

const ViewName = (props: { view: View }) => {
  if(props.view.isEditing)
    return <input type="text"
                  name="view-name-input"
                  className="form-control"
                  value={props.view.name}
                  onClick={stopPropagation}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => updateView(props.view.withName(event.currentTarget.value))}
                  onKeyUp={onEnter(() => saveView(props.view))}/>;
  return <span>{props.view.name}</span>;
};

const DefaultNumberOfBranchesPerTile = (props: { view: View }) => {
  if(props.view.isEditing)
    return <input type="number"
                  name="view-branches-per-tile-input"
                  className="form-control"
                  value={props.view.defaultNumberOfBranchesPerTile}
                  onClick={stopPropagation}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => updateView(props.view.withDefaultNumberOfBranchesPerTile(+event.currentTarget.value))}
                  onKeyUp={onEnter(() => saveView(props.view))}/>;
  return <span>{props.view.defaultNumberOfBranchesPerTile}</span>;
};

const handleSaveViewButtonClick = (view: View) => (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
  saveView(view);
};

const SaveViewButton = (props: { view : View }) => (
  <button className="save-view-button btn btn-success" onClick={handleSaveViewButtonClick(props.view)} title="Save">
    <i className="fa fa-check"/>
  </button>
);

const handleEditViewButtonClick = (view: View) => (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
  updateView(view.withIsEditing(true));
};

const EditViewButton = (props: { view: View }) => (
  <button className="edit-view-button btn btn-default" onClick={handleEditViewButtonClick(props.view)} title="Edit">
    <i className="fa fa-pencil"/>
  </button>
);

const DeleteViewButton = (props: { view: View }) => (
  <button className="delete-view-button btn btn-danger" onClick={() => {}} title="Delete">
    <i className="fa fa-remove"/>
  </button>
);