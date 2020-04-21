import React, { useState, useEffect, Fragment } from "react";
import MainPage from "./containers/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ComplitedTasks from "./containers/ComplitedTasks";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Backdrop from "./components/UI/Backdrop";
import WithError from "./components/UI/WithError";
import { auth, createUserProfile, signOut, signInWithGoogle } from "./firebase";
import {
  fetchList,
  addNewTask,
  deleteTask,
  compliteTask,
  fetchComplited,
} from "./utilities";

const App = () => {
  const [authShow, setAuthShow] = useState(true);
  const [temporary, setTemporary] = useState("");
  const [time, setTime] = useState(Math.floor(new Date().getTime() / 1000.0));
  const [complitedTime, setComplitedTime] = useState(
    Math.floor(new Date().getTime() / 1000.0)
  );
  const [complited, setComplited] = useState([]);
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
    setComplited([]);
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

  const compliteTaskHandler = async (id) => {
    setComplitedTime(Math.floor(new Date().getTime() / 1000.0));
    const allTasks = list;
    const tasks = allTasks.filter((task) => id !== task.id);
    await compliteTask(id, user, complitedTime);
    await deleteTask(id, user);
    setList(tasks);
  };

  const fetchListOfComplitedTasks = async () => {
    try {
      const tasks = await fetchComplited(user);
      let posts = tasks.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          return b.complitedTime - a.complitedTime;
        });
      setComplited(posts);
    } catch (err) {
      setError(err.message);
      deleteErrorMessage();
    }
  };

  const deleteErrorMessage = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
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
        clickComplite={() => compliteTaskHandler(task.id)}
        clickDel={() => deleteTaskHandler(task.id)}
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

  return (
    <Router>
      <div className="App">
        {authShow ? null : <Header logout={logout} />}
        <Switch>
          <Fragment>
            {error ? <WithError>{error}</WithError> : null}
            {authShow ? <Backdrop /> : null}
            {authShow ? authForm : null}
            <Route path="/complited">
              <ComplitedTasks
                fetchListOfComplitedTasks={fetchListOfComplitedTasks}
                complited={complited}
              />
            </Route>
            {authShow ? null : (
              <Route exact path="/">
                <MainPage
                  temporary={temporary}
                  temporaryChange={temporaryChange}
                  addToListHandler={addToListHandler}
                  tasksList={tasksList}
                />
              </Route>
            )}
          </Fragment>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
