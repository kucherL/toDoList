import React from "react";
import classes from "./App.css";
import MainPage from "./containers/MainPage/MainPage";

const App = props => {
  return (
    <div className={classes.App}>
      <MainPage />
    </div>
  );
};

export default App;
