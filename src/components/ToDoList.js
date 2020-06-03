import React from "react";
import addIcon from "../assets/add.svg";
import minusIcon from "../assets/minus1.svg";

const toDoList = (props) => {
  return (
    <div className="ToDoList">
      {props.task.temporary}
      <div className="Icons-container">
        <img
          src={addIcon}
          alt="add-icon"
          className="Icon"
          onClick={props.clickComplite}
        />
        <img
          src={minusIcon}
          alt="minus-icon"
          className="Icon"
          onClick={props.clickDel}
        />
      </div>
    </div>
  );
};

export default toDoList;
