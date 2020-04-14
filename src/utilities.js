import React from "react";
import { firestore } from "./firebase";

import WithError from "./components/UI/WithError/WithError";

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

export const errorHandler = (error) => <WithError>{error}</WithError>;
