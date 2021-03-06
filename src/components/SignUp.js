import React from "react";

const SignUp = (props) => {
  return (
    <form onSubmit={props.handleSignUpSubmit} className="SignUpForm">
      <h2 className="SignUpTitle">Sign up</h2>
      <input
        className="SignUpInput"
        type="email"
        name="email"
        placeholder="Email"
        value={props.emailSignUp}
        onChange={props.emailSignUpChangeHandler}
      />
      <input
        className="SignUpInput"
        type="password"
        name="password"
        placeholder="Password"
        value={props.passwordSignUp}
        onChange={props.passwordSignUpChangeHandler}
      />
      <input className="SignUpSubmit" type="submit" value="Sign up" />
    </form>
  );
};

export default SignUp;
