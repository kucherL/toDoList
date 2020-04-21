import React from "react";
import {Link, useHistory} from "react-router-dom";
import Button from "./UI/Button";

const Header = (props) => {
  let history = useHistory();

  const newLogout = () => {
    history.push("/");
    props.logout();
  }

  return (
    <div className="Header">
      <Link to="/" className="Link">
        Home
      </Link>
      <Link to="/complited" className="Link">
        Выполненные задачи
      </Link>
      <Button clicked={newLogout}>Выйти</Button>
    </div>
  );
};

export default Header;
