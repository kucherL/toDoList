import React, { useState } from "react";
import axios from "axios";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";

const Auth = props => {
  const [email, setEmail] = useState({
    type: "email",
    placeholder: "Введите почту",
    value: "",
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  });

  const [password, setPassword] = useState({
    type: "password",
    placeholder: "Введите пароль",
    value: "",
    validation: {
      required: true,
      minLength: 6
    },
    valid: false,
    touched: false
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const [token, setToken] = useState(null);

  const [userId, setUserId] = useState(null);

  // изменяет значение email, согласно введенному
  const emailChangeHandler = event => {
    setEmail({ value: event.target.value });
  };

  // изменяет значение password, согласно введенному
  const passwordChangeHandler = event => {
    setPassword({ value: event.target.value });
  };

  // меняет значение авторизации на противоположное
  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  // создает объект с введенными данными пользователя, отправляет данные либо для входа, либо для регистрации, сохраняет токен, айди, проверяет не истекло ли время хранения токена, и перенаправляет на главную страницу
  const signInHandler = () => {
    const userData = {
      email: email.value,
      password: password.value,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC69D7Y73CRcxMyqHRCohSmHoaMnzrn4qE";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC69D7Y73CRcxMyqHRCohSmHoaMnzrn4qE";
    }
    axios
      .post(url, userData)
      .then(response => {
        setToken(response.data.idToken);
        setUserId(response.data.localId);
        checkAuthTimeout(response.data.expiresIn);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // обнуляет токен и айди
  const logout = () => {
    setToken(null);
    setUserId(null);
    console.log(token);
    console.log(userId);
  };

  // проверяет, не истек ли срок токена
  const checkAuthTimeout = expirationTime => {
    setTimeout(() => {
      logout();
    }, expirationTime * 1000);
  };

  return (
    <div className={classes.Auth}>
      <Button clicked={switchAuthModeHandler}>
        {isSignUp ? "Войти" : "Регистрация"}
      </Button>
      <input
        type="text"
        className={classes.AuthInputText}
        onChange={emailChangeHandler}
        placeholder={email.placeholder}
      />
      <input
        type="text"
        className={classes.AuthInputText}
        onChange={passwordChangeHandler}
        placeholder={password.placeholder}
      />
      <Button clicked={signInHandler}>Отправить</Button>
    </div>
  );
};

export default Auth;
