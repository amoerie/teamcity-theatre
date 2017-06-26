import {createElement} from "react";
import {IView} from "../shared/contracts";
import {selectView} from "./settings.observables.selected-view";

export const Views = (props: { views: IView[] | null, selectedView: IView | null }) => {
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

const CreateViewButton = (props: {}) => (
  <button className="add-view-button btn btn-success" onClick={() => {
  }}>
    <i className="fa fa-plus"/> Create a new view
  </button>
);

const ViewsTable = (props: { views: IView[], selectedView: IView | null }) => {
  return (
    <table id="views-table" className="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th/>
      </tr>
      </thead>
      <tbody>{ props.views.map(view => <ViewRow view={view} selectedView={props.selectedView}/>) }</tbody>
    </table>
  );
};

const ViewRow = (props: { view: IView, selectedView: IView | null }) => {
  const isSelected = props.view === props.selectedView;

  const selectedClassName = isSelected ? "selected" : "";
  return (
    <tr className={`view ${selectedClassName}`}>
      <td className="view-name" onClick={() => selectView(props.view) }>{ props.view.name }</td>
      <td>
        <ConfigureViewButton view={props.view}/>
        <EditViewButton view={props.view}/>
        <DeleteViewButton view={props.view}/>
      </td>
    </tr>
  );
};

const ConfigureViewButton = (props: { view: IView }) => (
  <button className="configure-view-button btn btn-primary" onClick={() => selectView(props.view) }>
    <i className="fa fa-cogs"/> Configure
  </button>
);

const EditViewButton = (props: { view: IView }) => (
  <button className="edit-view-button btn btn-default" onClick={() => {
  }} title="Edit">
    <i className="fa fa-pencil"/>
  </button>
);

const DeleteViewButton = (props: { view: IView }) => (
  <button className="delete-view-button btn btn-danger" onClick={() => {
  }} title="Delete">
    <i className="fa fa-remove"/>
  </button>
);