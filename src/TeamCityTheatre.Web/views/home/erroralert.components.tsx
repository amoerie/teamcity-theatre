import {createElement } from "react";

export const ErrorAlert = (props: { error : Error }) => {
  return (
    <div className="alert alert-error">
      <strong>Error!</strong> Can you make sense of this?
      <div className="well well-lg">
        <h3>Details</h3>
        <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(props.error, null, 2) }} />
      </div>
    </div>
  );
};