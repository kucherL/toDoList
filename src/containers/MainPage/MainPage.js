import React, { useState, useEffect } from "react";
import axios from "../../axios-todos";
import InputForm from "../../components/InputForm/InputForm";
import ToDoList from "../../components/ToDoList/ToDoList";
import Button from "../../components/UI/Button/Button";
import Auth from "../Auth/Auth";
import classes from "./MainPage.css";

const MainPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authShow, setAuthShow] = useState(false);
  const [temporary, setTemporary] = useState("");
  const [list, setList] = useState([]);
  const [email, setEmail] = useState({
    type: "email",
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
    value: "",
    validation: {
      required: true,
      minLength: 6
    },
    valid: false,
    touched: false
  });

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
        setAuthShow(false);
        // fetchTodoList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // проверяет, не истек ли срок токена
  const checkAuthTimeout = expirationTime => {
    setTimeout(() => {
      logout();
    }, expirationTime * 1000);
  };

  let post = [];
  // выводит list, сохраненный на сервере, в зависимости от токена
  const fetchTodoList = () => {
    axios
      .get("/todos.json?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"')
      .then(res => {
        for (let obj in res.data) {
          post = res.data[obj].todoList;
        }
        setList(list.concat(post));
      })
      .catch(err => console.log(err));
  };

  // TODO: сохранять задачи сразу при введении, а не по нажатию на Сохранить
  // сохраняет введенные значение list на сервере по клику на Сохранить
  const saveTodoList = () => {
    const todoData = {
      todoList: list,
      userId: userId
    };
    axios.post("/todos.json?auth=" + token, todoData).catch(err => {
      console.log(err);
    });
  };

  // перенаправляет на страницу авторизации, если пользователь не залогинен, при попытке сохранить список задач
  const saveListHandler = () => {
    return token === null ? setAuthShow(true) : saveTodoList();
  };

  // обнуляет токен и айди
  const logout = () => {
    setToken(null);
    setUserId(null);
    setList([]);
  };

  // изменяет значение введенной задачи
  const temporaryChange = event => {
    setTemporary(event.target.value);
  };

  // TODO: убрать баг с дублированием задач
  // добавляет в list с тудушниками значение temporary и обнуляет temporary
  const addToListHandler = () => {
    setList(list.concat(temporary));
    setTemporary("");
  };

  // TODO: удалять элемент из БД по клику
  // изменяет массив list, удаляя задачу по клику
  const deleteTaskHandler = index => {
    const changedArr = [...list];
    changedArr.splice(index, 1);
    setList(changedArr);
  };

  // возвращает компонент с ранее введенными задачами
  const tasksList = list.map((task, index) => {
    return (
      <ToDoList
        task={task}
        key={index}
        click={() => deleteTaskHandler(index)}
      />
    );
  });

  let saveList = "";
  // выводит кнопку Сохранить, если на страницу есть хотя бы одна задача
  if (list.length > 0) {
    saveList = <Button clicked={saveListHandler}>Сохранить</Button>;
  }

  const authForm = (
    <Auth
      onChangeSwitchAuthModeHandler={switchAuthModeHandler}
      onChangeEmailChangeHandler={emailChangeHandler}
      onChangePasswordChangeHandler={passwordChangeHandler}
      onChangeSignInHandler={signInHandler}
    />
  );

  return (
    <div className={classes.MainPage}>
      {token !== null ? (
        <Button clicked={logout}>Выйти</Button>
      ) : isSignUp ? (
        <Button clicked={() => setAuthShow(!authShow)}>Войти</Button>
      ) : (
        <Button clicked={() => setAuthShow(!authShow)}>Регистрация</Button>
      )}
      {authShow ? authForm : null}
      <Button clicked={fetchTodoList}>Загрузить задачи</Button>
      <p className={classes.Text}>ToDo List:</p>
      <InputForm
        currentValue={temporary}
        changeTemporaryState={temporaryChange}
        addTask={addToListHandler}
      />
      {tasksList}
      {saveList}
    </div>
  );
};

export default MainPage;
