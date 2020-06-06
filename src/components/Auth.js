import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Button from "../components/UI/Button";

const auth = (props) => {
  return (
    <div className="Auth">
      <Button clicked={props.signInShowHandler}>
        {props.signInChange ? "Change to Sign Up" : "Change to Sign In"}
      </Button>
      {props.signInChange ? (
        <SignIn
          emailSignIn={props.emailSignIn}
          emailSignInChangeHandler={props.emailSignInChangeHandler}
          passwordSignIn={props.passwordSignIn}
          passwordSignInChangeHandler={props.passwordSignInChangeHandler}
          handleSignInSubmit={props.handleSignInSubmit}
          handlSignInWithGoogle={props.handlSignInWithGoogle}
        />
      ) : (
        <SignUp
          emailSignUp={props.emailSignUp}
          emailSignUpChangeHandler={props.emailSignUpChangeHandler}
          passwordSignUp={props.passwordSignUp}
          passwordSignUpChangeHandler={props.passwordSignUpChangeHandler}
          handleSignUpSubmit={props.handleSignUpSubmit}
        />
      )}
    </div>
  );
};

export default auth;
