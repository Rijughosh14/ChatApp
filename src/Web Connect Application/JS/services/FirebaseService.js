
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import  firebaseConfig  from "../config/Firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export default app