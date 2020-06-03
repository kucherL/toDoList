import React, { useEffect } from "react";
import Task from "../components/Task";

const ComplitedTasks = (props) => {
  useEffect(() => {
    props.fetchListOfComplitedTasks();
  }, []);

  const tasksList = props.complited.map((task, index) => {
    return <Task task={task} key={index} />;
  });

  return (
    <div className="ComplitedTasks">
      <p className="ComplitedTasks__title">Complited tasks</p>
      <div>{tasksList}</div>
    </div>
  );
};

export default ComplitedTasks;
