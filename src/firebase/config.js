import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'
import { getStorage } from "firebase/storage";
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCogPkEubDihKUF4VPkglUluM1g-KI9LK4",
  authDomain: "letslearn-492ad.firebaseapp.com",
  projectId: "letslearn-492ad",
  storageBucket: "letslearn-492ad.appspot.com",
  messagingSenderId: "902676893040",
  appId: "1:902676893040:web:aa26d6decf3ec78bc393b5",
  measurementId: "G-SX3L6SH29P"
  };

  export const Firebase=  firebase.initializeApp(firebaseConfig)