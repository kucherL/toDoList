import React from "react";
import Button from "./UI/Button";

const inputForm = (props) => {
  return (
    <div className="InputForm">
      <input
        className="InputText"
        type="text"
        onChange={props.changeTemporaryState}
        value={props.currentValue}
        placeholder="Add task"
      />
      <Button clicked={props.addTask}>Add</Button>
    </div>
  );
};

export default inputForm;
