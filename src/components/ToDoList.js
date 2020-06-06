import React from "react";
import checkIcon from "../assets/check-square-o.svg";
import trashIcon from "../assets/trash.svg";

const toDoList = (props) => {
  return (
    <div className="ToDoList">
      {props.task.temporary}
      <div className="Icons-container">
        <img
          src={checkIcon}
          alt="add-icon"
          className="Icon"
          onClick={props.clickComplite}
        />
        <img
          src={trashIcon}
          alt="minus-icon"
          className="Icon"
          onClick={props.clickDel}
        />
      </div>
    </div>
  );
};

export default toDoList;
