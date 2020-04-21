import React from "react";

const task = (props) => {
  return (
    <div className="ToDoList">
      {props.task.temporary}
    </div>
  );
};

export default task;