import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const toDoList = (props) => {
  return (
    <div className="ToDoList">
      {props.task.temporary}
      <div className="Icons-container">
        <FontAwesomeIcon
          className="Icon"
          size="2x"
          icon={faCheck}
          onClick={props.clickComplite}
        />
        <FontAwesomeIcon
          className="Icon"
          size="2x"
          icon={faTimes}
          onClick={props.clickDel}
        />
      </div>
    </div>
  );
};

export default toDoList;
