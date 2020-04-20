import React, { Fragment, useEffect, useState } from "react";
import Task from "../components/task";
import { fetchComplited } from "../utilities";

const ComplitedTasks = (props) => {
  const [complited, setComplited] = useState([]);

  useEffect(() => {
    fetchListOfComplitedTasks();
  }, []);

  const fetchListOfComplitedTasks = async () => {
    const tasks = await fetchComplited(props.user);
    let posts = tasks.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        return a.time - b.time;
      });
    setComplited(posts);
    console.log(complited);
  };

  const tasksList = complited.map((task, index) => {
    return <Task task={task} key={index} />;
  });

  return (
    <Fragment>
      <p className="Text">Выполненные задачи</p>
      <div>{tasksList}</div>
    </Fragment>
  );
};

export default ComplitedTasks;
