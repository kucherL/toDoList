import React from "react";

import InputForm from "../components/InputForm";

const MainPage = (props) => {
  return (
    <div className="MainPage">
      <p className="Text">ToDo List</p>
      <InputForm
        currentValue={props.temporary}
        changeTemporaryState={props.temporaryChange}
        addTask={props.addToListHandler}
      />
      {props.tasksList}
    </div>
  );
};

export default MainPage;
