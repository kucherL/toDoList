import React from "react";
import classes from "./SignUp.css";

const SignUp = (props) => {
  return (
    <form onSubmit={props.handleSignUpSubmit} className={classes.SignUpForm}>
      <h2 className={classes.SignUpTitle}>Регистрация</h2>
      <input
        className={classes.SignUpInput}
        type="email"
        name="email"
        placeholder="Email"
        value={props.emailSignUp}
        onChange={props.emailSignUpChangeHandler}
      />
      <input
        className={classes.SignUpInput}
        type="password"
        name="password"
        placeholder="Password"
        value={props.passwordSignUp}
        onChange={props.passwordSignUpChangeHandler}
      />
      <input
        className={classes.SignUpSubmit}
        type="submit"
        value="Зарегистрироваться"
      />
    </form>
  );
};

export default SignUp;
