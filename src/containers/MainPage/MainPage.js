import React, { useState, useEffect, Fragment } from "react";
import InputForm from "../../components/InputForm/InputForm";
import ToDoList from "../../components/ToDoList/ToDoList";
import Button from "../../components/UI/Button/Button";
import Auth from "../../components/Auth/Auth";
import {
  auth,
  createUserProfile,
  signOut,
  signInWithGoogle,
} from "../../firebase";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import classes from "./MainPage.css";
import {
  fetchList,
  addNewTask,
  deleteTask,
  errorHandler,
} from "../../utilities";

const MainPage = () => {
  const [authShow, setAuthShow] = useState(true);
  const [temporary, setTemporary] = useState("");
  const [time, setTime] = useState(Math.floor(new Date().getTime() / 1000.0));
  const [list, setList] = useState([]);
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user.uid);
        setAuthShow(false);
        await fetchTodoList(user.uid);
      } else {
        try {
        } catch (err) {
          setError(err.message);
          deleteErrorMessage();
        }
      }
    });
  }, []);

  const emailSignUpChangeHandler = (event) => {
    setEmailSignUp(event.target.value);
  };
  const passwordSignUpChangeHandler = (event) => {
    setPasswordSignUp(event.target.value);
  };

  const emailSignInChangeHandler = (event) => {
    setEmailSignIn(event.target.value);
  };
  const passwordSignInChangeHandler = (event) => {
    setPasswordSignIn(event.target.value);
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        emailSignUp,
        passwordSignUp
      );
      createUserProfile(user);
      setAuthShow(false);
    } catch (err) {
      setError(err.message);
      deleteErrorMessage();
    }
    setEmailSignUp("");
    setPasswordSignUp("");
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(emailSignIn, passwordSignIn);
    } catch (err) {
      setError(err.message);
      deleteErrorMessage();
    }
    setEmailSignIn("");
    setPasswordSignIn("");
  };

  const handlSignInWithGoogle = () => {
    try {
      signInWithGoogle();
    } catch (err) {
      setError(err.message);
      deleteErrorMessage();
    }
  };

  const logout = () => {
    setList([]);
    setUser(null);
    signOut();
    setAuthShow(true);
  };

  const fetchTodoList = async (user) => {
    const tasks = await fetchList(user);
    let posts = tasks.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        return a.time - b.time;
      });
    setList(posts);
  };

  const temporaryChange = (event) => {
    setTemporary(event.target.value);
  };

  const addToListHandler = async () => {
    setTime(Math.floor(new Date().getTime() / 1000.0));
    try {
      console.log(time);
      const taskData = await addNewTask({ temporary, user, time });
      const toDoData = {
        id: taskData.id,
        ...taskData.data(),
      };
      setList(list.concat(toDoData));
    } catch (err) {
      setError(err.message);
      deleteErrorMessage();
    }
    setTemporary("");
  };

  const deleteTaskHandler = async (id) => {
    const allTasks = list;
    const tasks = allTasks.filter((task) => id !== task.id);
    await deleteTask(id, user);
    setList(tasks);
  };

  const deleteErrorMessage = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
    setAuthShow(true);
    setEmailSignUp("");
    setPasswordSignUp("");
    setEmailSignIn("");
    setPasswordSignIn("");
  };

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
      emailSignUp={emailSignUp}
      emailSignUpChangeHandler={emailSignUpChangeHandler}
      passwordSignUp={passwordSignUp}
      passwordSignUpChangeHandler={passwordSignUpChangeHandler}
      emailSignIn={emailSignIn}
      emailSignInChangeHandler={emailSignInChangeHandler}
      passwordSignIn={passwordSignIn}
      passwordSignInChangeHandler={passwordSignInChangeHandler}
      handleSignUpSubmit={handleSignUpSubmit}
      handleSignInSubmit={handleSignInSubmit}
      handlSignInWithGoogle={handlSignInWithGoogle}
    />
  );

  const header = (
    <div className={classes.Header}>
      {!authShow ? <Button clicked={logout}>Выйти</Button> : null}
    </div>
  );

  const mainPage = (
    <div className={classes.MainPage}>
      <p className={classes.Text}>ToDo List</p>
      <InputForm
        currentValue={temporary}
        changeTemporaryState={temporaryChange}
        addTask={addToListHandler}
      />
      {tasksList}
    </div>
  );

  return (
    <Fragment>
      {error ? errorHandler(error) : null}
      {authShow ? <Backdrop /> : null}
      {authShow ? authForm : null}
      {authShow ? null : header}
      {authShow ? null : mainPage}
    </Fragment>
  );
};

export default MainPage;
