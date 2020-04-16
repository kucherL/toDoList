import React, {Fragment} from "react";
import classes from "./WithError.css";

const withError = (props) => (
  <Fragment>
    <div className={classes.BackgroundError}></div>
    <div className={classes.ErrorContainer}>
      <p className={classes.ErrorText}>{props.children}</p>
    </div>
  </Fragment>
);

export default withError;
