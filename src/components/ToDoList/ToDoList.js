import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import classes from './ToDoList.css';

const toDoList = (props) => {
  return (
    <div className={classes.ToDoList}>
      {props.task}
      <FontAwesomeIcon className={classes.Icon} size="2x" icon={faMinusCircle} onClick={props.click} />
    </div>
  );
};

export default toDoList;