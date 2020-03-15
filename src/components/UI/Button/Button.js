import React from "react";
import classes from "./Button.css";

const button = props => (
  <div className={classes.Fragment}>
    <button className={classes.Button} onClick={props.clicked}>
      {props.children}
    </button>
  </div>
);

export default button;
