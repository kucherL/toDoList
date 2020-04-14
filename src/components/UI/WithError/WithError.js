import React from "react";
import classes from "./WithError.css";

const withError = (props) => (
    <div className={classes.ErrorContainer}>
      <p className={classes.ErrorText}>{props.children}</p>
    </div>
);

export default withError;
