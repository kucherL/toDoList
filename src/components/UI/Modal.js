import React from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";

const Modal = (props) => {
  let history = useHistory();

  const newLogout = () => {
    history.push("/");
    props.logout();
    props.clean();
  };

  return (
    <>
      <div
        className="BackgroundError"
        show={props.show}
        onClick={props.clean}
      />
      <div className="Modal">
        {props.children}
        {props.error === null ? (
          <div>
            <Button clicked={newLogout}>Submit</Button>
            <Button clicked={props.clean}>Decline</Button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Modal;
