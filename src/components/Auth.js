import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const auth = (props) => {
  return (
    <div className="Auth">
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
