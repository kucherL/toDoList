import React, { Fragment } from "react";

const withError = (props) => {
  return (
    <Fragment>
      <div className="BackgroundError"></div>
      <div className="ErrorContainer">
        <p className="ErrorText">{props.children}</p>
      </div>
    </Fragment>
  );
};

export default withError;
