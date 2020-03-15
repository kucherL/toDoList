import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-todo-list-1785e.firebaseio.com/"
});

export default instance;