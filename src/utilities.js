import { firestore } from "./firebase";

export const fetchList = async (user) => {
  const response = await firestore.collection(`users/${user}/tasks`).get();
  return response;
};

export const addNewTask = async (temporary) => {
  const taskRef = await firestore
    .collection(`users/${temporary.user}/tasks`)
    .add(temporary);
  const task = await taskRef.get();
  return task;
};

export const deleteTask = async (id, user) => {
  await firestore.doc(`users/${user}/tasks/${id}`).delete();
};

export const compliteTask = async (id, user, complitedTime) => {
  let complitedUsersTask = await firestore
    .doc(`users/${user}/tasks/${id}`)
    .get();
  complitedUsersTask = {
    id: complitedUsersTask.id,
    complitedTime: complitedTime,
    ...complitedUsersTask.data(),
  };
  await firestore.collection(`users/${user}/complited`).add(complitedUsersTask);
};

export const fetchComplited = async (user) => {
  const response = await firestore.collection(`users/${user}/complited`).get();
  return response;
};
