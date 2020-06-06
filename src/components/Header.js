import React from "react";
import { Link } from "react-router-dom";
import Button from "./UI/Button";

const Header = (props) => {
  return (
    <div className="Header">
      <p className="Header__copyright">
        2020 |
        <a
          href="https://kucherl.github.io/portfolio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Elizaveta Kucherova
        </a>
      </p>
      <div>
        <Link to="/" className="Link">
          Home
        </Link>
        <Link to="/complited" className="Link">
          Complited tasks
        </Link>
        <Button clicked={props.logoutWarningHandler}>Sign out</Button>
      </div>
    </div>
  );
};

export default Header;
