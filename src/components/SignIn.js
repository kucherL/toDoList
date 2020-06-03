import React, { Fragment } from "react";
import Button from "./UI/Button";

const SignIn = (props) => {
  return (
    <Fragment>
      <form onSubmit={props.handleSignInSubmit} className="SignInForm">
        <h2 className="SignInTitle">Sign in</h2>
        <input
          className="SignInInput"
          type="email"
          name="email"
          placeholder="Email"
          value={props.emailSignIn}
          onChange={props.emailSignInChangeHandler}
        />
        <input
          className="SignInInput"
          type="password"
          name="password"
          placeholder="Password"
          value={props.passwordSignIn}
          onChange={props.passwordSignInChangeHandler}
        />
        <input className="SignInSubmit" type="submit" value="Sign in" />
      </form>
      <Button clicked={props.handlSignInWithGoogle}>Sign in with Google</Button>
    </Fragment>
  );
};

export default SignIn;
