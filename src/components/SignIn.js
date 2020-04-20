import React, { Fragment } from "react";
import Button from "./UI/Button";

const SignIn = (props) => {
  return (
    <Fragment>
      <form onSubmit={props.handleSignInSubmit} className="SignInForm">
        <h2 className="SignInTitle">Войти</h2>
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
        <input className="SignInSubmit" type="submit" value="Войти" />
      </form>
      <Button clicked={props.handlSignInWithGoogle}>Войти через Google</Button>
    </Fragment>
  );
};

export default SignIn;
