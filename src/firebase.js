import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_n31x6MDHuLKu4V-dLS7bY8tUS6YP0N4",
  authDomain: "todo-list-c5bb2.firebaseapp.com",
  databaseURL: "https://todo-list-c5bb2.firebaseio.com",
  projectId: "todo-list-c5bb2",
  storageBucket: "todo-list-c5bb2.appspot.com",
  messagingSenderId: "256690466461",
  appId: "1:256690466461:web:6ac19920c29d7072f52e74",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfile = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.id}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.log(error);
  }
};

export default firebase;
