import React from "react";
import classes from "./App.css";
import MainPage from "./containers/MainPage/MainPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ComplitedTasks from "./components/ComplitedTasks";

const App = (props) => {
  return (
    <div className={classes.App}>
      <Router>
      <Link to="/">Home</Link>
        <Link to="/complited">Выполненные задачи</Link>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/complited">
            <ComplitedTasks />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
