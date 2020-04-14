import React from "react";
import classes from "./Auth.css";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

const auth = (props) => {
  return (
    <div className={classes.Auth}>
      <SignIn
        emailSignIn={props.emailSignIn}
        emailSignInChangeHandler={props.emailSignInChangeHandler}
        passwordSignIn={props.passwordSignIn}
        passwordSignInChangeHandler={props.passwordSignInChangeHandler}
        handleSignInSubmit={props.handleSignInSubmit}
        handlSignInWithGoogle={props.handlSignInWithGoogle}
      />
      <SignUp
        emailSignUp={props.emailSignUp}
        emailSignUpChangeHandler={props.emailSignUpChangeHandler}
        passwordSignUp={props.passwordSignUp}
        passwordSignUpChangeHandler={props.passwordSignUpChangeHandler}
        handleSignUpSubmit={props.handleSignUpSubmit}
      />
    </div>
  );
};

export default auth;
