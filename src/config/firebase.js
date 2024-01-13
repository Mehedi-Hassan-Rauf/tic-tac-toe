// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLAlnH1iVKnyJCkOzfieJ0qAP82D31pYk",
  authDomain: "tic-tac-toe-825cf.firebaseapp.com",
  projectId: "tic-tac-toe-825cf",
  storageBucket: "tic-tac-toe-825cf.appspot.com",
  messagingSenderId: "62206040843",
  appId: "1:62206040843:web:2d473ddda96da243bea00e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
