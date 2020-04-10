import axios from "./axios-todos";
import { firestore } from "./firebase";
import { auth } from "./firebase";

export const signUp = async (email, password) => {
  // let url =
  //   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC69D7Y73CRcxMyqHRCohSmHoaMnzrn4qE";
  // if (!isSignUp) {
  //   url =
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC69D7Y73CRcxMyqHRCohSmHoaMnzrn4qE";
  // }
  // const response = await axios.post(url, userData);
  // return response.data;
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
};

export const fetchList = async () => {
  const response = await firestore.collection("tasks").get();
  return response;
};

export const addNewTask = async (temporary) => {
  const taskRef = await firestore.collection("tasks").add(temporary);
  const task = await taskRef.get();
  return task;
};

export const deleteTask = async (id) => {
  await firestore.doc(`tasks/${id}`).delete();
};
