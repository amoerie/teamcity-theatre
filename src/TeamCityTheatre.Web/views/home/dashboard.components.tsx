import { createElement, MouseEvent } from "react";
import { selectView } from "./dashboard.observables";
import { IView, IViewData, ITileData, BuildStatus, IDetailedBuild } from "../shared/contracts";
import * as parse from "date-fns/parse";
import * as addSeconds from "date-fns/add_seconds";
import * as distanceInWordsToNow from "date-fns/distance_in_words_to_now";

/**
 * Root dispatching component
 */
export const Dashboard =
  (props: { views: IView[] | null, selectedView: IView | null, selectedViewData: IViewData | null }) => {
    if (props.views === null)
      return <div>
               <i className="fa fa-spin fa-cog"/> Loading views
             </div>;

    if (props.selectedView === null)
      return <Views views={props.views}/>;

    if (props.selectedViewData === null)
      return <div>
               <i className="fa fa-spin fa-cog"/> Loading view data
             </div>;

    return <View view={props.selectedView} data={props.selectedViewData}/>;
  };

/**
 * List of views to choose from
 */
const Views = (props: { views: IView[] }) => (
  <div id="views">
    {props.views.map(view => (
      <a className="btn btn-primary view" id={view.id} onClick={() => selectView(view)}>
        {view.name} <span className="badge">{view.tiles.length} tiles</span>
      </a>))}
  </div>
);

const tryRequestFullScreen = (event: MouseEvent<HTMLButtonElement>) => {
  const button = event.currentTarget as HTMLButtonElement;
  const view = button.parentNode as HTMLDivElement;
  if (view.requestFullscreen) view.requestFullscreen();
  if (view.webkitRequestFullScreen) view.webkitRequestFullScreen();
  if (view.webkitRequestFullscreen) view.webkitRequestFullscreen();
};

/**
 * Details of a single view
 */
const View = (props: { view: IView, data: IViewData }) => (
  <div id={props.view.id}>
    <button role="button" className="btn btn-primary btn-xs" onClick={tryRequestFullScreen}>
      <i className="fa fa-expand"/> Full screen
    </button>
    <div id="tiles">
      <div className="tiles-wrapper">
        {props.data.tiles.map(tile => <Tile view={props.view} data={tile}/>) }
      </div>
    </div>
  </div>
);

/**
 * A single tile of a view
 */
const Tile = (props: { view: IView, data: ITileData }) => {
  const buildStatus = BuildStatus[props.data.combinedBuildStatus].toLowerCase();
  const height = `height-${props.view.defaultNumberOfBranchesPerTile}`;
  return (
    <div id={props.data.id} className={`tile ${buildStatus} ${height} col-xs-6 col-sm-4 col-md-3 col-lg-2`}>
      <h4 className="tile-title">{props.data.label}</h4>
      <div className="tile-builds">
        { props.data.builds.map(build => <Build build={build} />) }
      </div>
    </div>
  );
};

/**
 * A single build in a tile
 */
const Build = (props: { build: IDetailedBuild }) => {
  const isFinished = props.build.state === "finished";
  const isRunning = props.build.state === "running";
  const isSuccess = props.build.status === BuildStatus.Success;

  const buildStatus = BuildStatus[props.build.status].toLowerCase();
  const percentageCompleted = isFinished ? 100 : props.build.percentageComplete;
  const progressBarTheme = isSuccess ? "progress-bar-success" : "progress-bar-danger";
  const progressBarAnimation = isRunning ? "progress-bar-striped active" : "";

  return (
    <div id={props.build.id} className={`tile-build ${buildStatus}`}>
      <div className="progress">
        <div className={`progress-bar ${progressBarTheme} ${progressBarAnimation}`} style={{ width: `${percentageCompleted}%` }}>
          {<Branch build={props.build} />}
          {isFinished ? <FinishDate build={props.build} /> : null}
          {isRunning ? <TimeRemaining build={props.build} /> : null }
        </div>
      </div>
    </div>
  );
};

const Branch = (props: { build: IDetailedBuild }) => {
  const isDefaultBranch = props.build.isDefaultBranch;
  const branchDisplayName = props.build.branchName || props.build.number;
  return isDefaultBranch
    ? <span className="branch"><i className="fa fa-star"/> {branchDisplayName}</span>
    : <span className="branch">{branchDisplayName}</span>;
};

const FinishDate = (props: { build: IDetailedBuild }) => {
  const finishDate = parse(props.build.finishDate);
  const differenceWithNow = distanceInWordsToNow(finishDate, { includeSeconds: true, addSuffix: true });
  return (<span className="execution-timestamp">{`Finished: ${differenceWithNow}`}</span>);
};

const TimeRemaining = (props: { build: IDetailedBuild }) => {
  const estimatedFinishDate = addSeconds(parse(props.build.startDate), props.build.estimatedTotalSeconds);
  const differenceWithNow = distanceInWordsToNow(estimatedFinishDate, { includeSeconds: true, addSuffix: true });
  return (<span className="remaining">{`Estimated finish: ${differenceWithNow}`}</span>);
};