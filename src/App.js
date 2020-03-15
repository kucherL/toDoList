import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Button from "./components/UI/Button/Button";
import classes from "./App.css";
// import MainPage from "./MainPage/MainPage";
// import Auth from "./Auth/Auth";

const MainPage = React.lazy(() => {
  return import("./containers/MainPage/MainPage");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = props => {
  let routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" render={props => <MainPage {...props} />} />
      </Switch>
    </BrowserRouter>
  );

  return (
    <div className={classes.App}>
      <Suspense fallback={<p>Loading...</p>}>
        <Button>Выйти</Button>
        {routes}
      </Suspense>
    </div>
  );
};

export default App;
