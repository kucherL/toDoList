import React, { useState, Fragment, useEffect } from "react";
import InputForm from "../../components/InputForm/InputForm";
import ToDoList from "../../components/ToDoList/ToDoList";
import Button from "../../components/UI/Button/Button";
import Auth from "../Auth/Auth";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import classes from "./MainPage.css";
import { signUp, fetchList, addNewTask, deleteTask } from "../../utilities";
import { signOut, signInWithGoogle, createUserProfile } from "../../firebase";

const MainPage = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authShow, setAuthShow] = useState(true);
  const [temporary, setTemporary] = useState("");
  const [list, setList] = useState([]);
  const [email, setEmail] = useState({
    type: "email",
    value: "",
    validation: {
      required: true,
      isEmail: true,
    },
    valid: false,
    touched: false,
  });
  const [password, setPassword] = useState({
    type: "password",
    value: "",
    validation: {
      required: true,
      minLength: 6,
    },
    valid: false,
    touched: false,
  });

  // изменяет значение email, согласно введенному
  const emailChangeHandler = (event) => {
    setEmail({ value: event.target.value });
  };

  // изменяет значение password, согласно введенному
  const passwordChangeHandler = (event) => {
    setPassword({ value: event.target.value });
  };

  // меняет значение авторизации на противоположное
  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  // создает объект с введенными данными пользователя, отправляет данные либо для входа, либо для регистрации, сохраняет токен, айди, проверяет не истекло ли время хранения токена, и перенаправляет на главную страницу
  const signInHandler = async (event) => {
    // const userData = {
    //   email: email.value,
    //   password: password.value,
    //   returnSecureToken: true,
    // };
    // try {
    //   const user = await signUp(isSignUp, userData);
    //   setToken(user.idToken);
    //   setUserId(user.localId);
    //   // checkAuthTimeout(user.expiresIn);
    //   setAuthShow(false);
    // } catch (err) {
    //   console.log(err);
    // }

    event.preventDefault();
    const userData = {
      email: email.value,
      password: password.value,
    };
    try {
      await signUp(userData.email, userData.password);
      createUserProfile(userData);
      setAuthShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogleHandler = () => {
    signInWithGoogle();
    setAuthShow(false);
  };

  // проверяет, не истек ли срок токена
  // const checkAuthTimeout = (expirationTime) => {
  //   setTimeout(() => {
  //     logout();
  //   }, expirationTime * 1000);
  // };

  // выводит list, сохраненный на сервере, в зависимости от токена
  const fetchTodoList = async () => {
    const tasks = await fetchList();
    const posts = tasks.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setList(posts);
    setIsFetched(true);
  };

  // обнуляет токен и айди
  const logout = () => {
    setToken(null);
    setUserId(null);
    setList([]);
    setAuthShow(true);
  };

  // изменяет значение введенной задачи
  const temporaryChange = (event) => {
    setTemporary(event.target.value);
  };

  // добавляет в list с тудушниками значение temporary и обнуляет temporary
  const addToListHandler = async () => {
    try {
      const taskData = await addNewTask({ temporary });
      const toDoData = {
        id: taskData.id,
        ...taskData.data(),
      };
      setList(list.concat(toDoData));
    } catch (err) {
      console.log(err);
    }
    setTemporary("");
  };

  // изменяет массив list, удаляя задачу по клику
  const deleteTaskHandler = async (id) => {
    const allTasks = list;
    const tasks = allTasks.filter((task) => id !== task.id);
    await deleteTask(id);
    setList(tasks);
  };

  // возвращает компонент с ранее введенными задачами
  const tasksList = list.map((task, index) => {
    return (
      <ToDoList
        task={task}
        key={index}
        click={() => deleteTaskHandler(task.id)}
      />
    );
  });

  const authForm = (
    <Auth
      sighUpHandler={switchAuthModeHandler}
      isSignUp={isSignUp}
      onChangeEmailChangeHandler={emailChangeHandler}
      onChangePasswordChangeHandler={passwordChangeHandler}
      onChangeSignInHandler={signInHandler}
      signInWithGoogleHandler={signInWithGoogleHandler}
    />
  );

  const header = (
    <div className={classes.Header}>
      {!authShow ? <Button clicked={signOut}>Выйти</Button> : null}
      {!isFetched && !authShow ? (
        <Button clicked={fetchTodoList}>Загрузить задачи</Button>
      ) : null}
    </div>
  );

  return (
    <Fragment>
      {authShow ? <Backdrop /> : null}
      {authShow ? authForm : null}
      {authShow ? null : header}
      <div className={classes.MainPage}>
        <p className={classes.Text}>ToDo List</p>
        <InputForm
          currentValue={temporary}
          changeTemporaryState={temporaryChange}
          addTask={addToListHandler}
        />
        {tasksList}
      </div>
    </Fragment>
  );
};

export default MainPage;
