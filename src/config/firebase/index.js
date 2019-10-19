import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxldTyGOn4hMnlRlX37VWovoLfNP4tUb8",
  authDomain: "first-firebase-project-68a63.firebaseapp.com",
  databaseURL: "https://first-firebase-project-68a63.firebaseio.com",
  projectId: "first-firebase-project-68a63",
  storageBucket: "",
  messagingSenderId: "659050934429",
  appId: "1:659050934429:web:f7cb56f5f6fdb7732fe474",
  measurementId: "G-SZ5RVWYNT1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
