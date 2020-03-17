import React from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";

const auth = props => (
  <div className={classes.Auth}>
    <Button clicked={props.onChangeSwitchAuthModeHandler}>
      Изменить
    </Button>
    <input
      type="text"
      className={classes.AuthInputText}
      onChange={props.onChangeEmailChangeHandler}
      placeholder="Введите почту"
    />
    <input
      type="text"
      className={classes.AuthInputText}
      onChange={props.onChangePasswordChangeHandler}
      placeholder="Введите пароль"
    />
    <Button clicked={props.onChangeSignInHandler}>Отправить</Button>
  </div>
);

export default auth;
