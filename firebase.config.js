import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAOWiG5YJo0oNAAJSmIwx6Zeqe7Yeu5j_g",
    authDomain: "nutrivis-c1746.firebaseapp.com",
    projectId: "nutrivis-c1746",
    storageBucket: "nutrivis-c1746.appspot.com",
    messagingSenderId: "861120730728",
    appId: "1:861120730728:web:6f2a5961efc3ff9e1a0ddd",
    measurementId: "G-D475EFJBN4"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

