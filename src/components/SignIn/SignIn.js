import React, { Fragment } from "react";
import classes from "./SignIn.css";
import Button from "../UI/Button/Button";

const SignIn = (props) => {
  return (
    <Fragment>
      <form onSubmit={props.handleSignInSubmit} className={classes.SignInForm}>
        <h2 className={classes.SignInTitle}>Войти</h2>
        <input
          className={classes.SignInInput}
          type="email"
          name="email"
          placeholder="Email"
          value={props.emailSignIn}
          onChange={props.emailSignInChangeHandler}
        />
        <input
          className={classes.SignInInput}
          type="password"
          name="password"
          placeholder="Password"
          value={props.passwordSignIn}
          onChange={props.passwordSignInChangeHandler}
        />
        <input className={classes.SignInSubmit} type="submit" value="Войти" />
      </form>
      <Button clicked={props.handlSignInWithGoogle}>Войти через Google</Button>
    </Fragment>
  );
};

export default SignIn;
