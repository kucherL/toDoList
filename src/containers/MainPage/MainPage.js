import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "../../axios-todos";
import InputForm from "../../components/InputForm/InputForm";
import ToDoList from "../../components/ToDoList/ToDoList";
import Button from "../../components/UI/Button/Button";
import classes from "./MainPage.css";

const MainPage = props => {
  // хранит значение и состояние одной задачи
  const [temporary, setTemporary] = useState("");
  // хранит значение и состояние всех задач
  const [list, setList] = useState([]);

  // изменяет значение введенной задачи
  const temporaryChange = event => {
    setTemporary(event.target.value);
  };

  // добавляет в list с тудушниками значение temporary и обнуляет temporary
  const addToListHandler = () => {
    setList(list.concat(temporary));
    setTemporary("");
  };

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

  // сохраняет введенные значение list на сервере по клику на Сохранить
  const saveTodoList = token => {
    axios
      .post("/todos.json?auth=" + token, list)
      .then(response => {
        console.log(response);
        console.log(token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // выводит list, сохраненный на сервере, в зависимости от токена
  const fetchTodoList = props => {
    axios
      .get("/todos.json?auth=" + props.token)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  // перенаправляет на страницу авторизации, если пользователь не залогинен, при попытке сохранить список задач
  const saveListHandler = props => {
    return props.token === "" ? <Redirect to="/auth" /> : saveTodoList();
  };

  let saveList = "";

  // выводит кнопку Сохранить, если на страницу есть хотя бы одна задача
  if (list.length > 0) {
    saveList = <Button clicked={saveListHandler}>Сохранить</Button>;
  }

  return (
    <div className={classes.MainPage}>
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
