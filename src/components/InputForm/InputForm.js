import React from "react";
import classes from "./InputForm.css";
import Button from "../UI/Button/Button";

const inputForm = props => {
  return (
    <div className={classes.InputForm}>
      <input
        className={classes.InputText}
        type="text"
        onChange={props.changeTemporaryState}
        value={props.currentValue}
        placeholder="Добавьте задачу"
      />
      <Button clicked={props.addTask}>Добавить</Button>
    </div>
  );
};

export default inputForm;
