import React from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";

const auth = (props) => {
  let text = "";

  return (
    <div className={classes.Auth}>
      <Button clicked={props.sighUpHandler}>
        {props.isSignUp ? (text = "Регистрация") : (text = "Войти")}
      </Button>
      <input
        type="text"
        className={classes.AuthInputText}
        onChange={props.onChangeEmailChangeHandler}
        placeholder="Введите почту"
      />
      <input
        type="password"
        className={classes.AuthInputText}
        onChange={props.onChangePasswordChangeHandler}
        placeholder="Введите пароль"
      />
      <Button clicked={props.onChangeSignInHandler}>Отправить</Button>
      <Button clicked={props.signInWithGoogleHandler}>Google</Button>
    </div>
  );
};

export default auth;
