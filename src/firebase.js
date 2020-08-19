import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';

var firebaseConfig = {
    apiKey: "AIzaSyCNkhXWbu0DChYcs6DZvm8UousC3D4m8d8",
    authDomain: "drivingapp-3c472.firebaseapp.com",
    databaseURL: "https://drivingapp-3c472.firebaseio.com",
    projectId: "drivingapp-3c472",
    storageBucket: "drivingapp-3c472.appspot.com",
    messagingSenderId: "139865443610",
    appId: "1:139865443610:web:8fd78034f6b188acca70a3",
    measurementId: "G-2RVFH9N5SY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;