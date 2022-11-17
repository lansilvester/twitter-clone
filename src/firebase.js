import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import "firebase/firestore"
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC2IZRcrtSA7uTvbDT4N3tXtf9YEwxjDyE",
    authDomain: "twitter-clone-7b2ea.firebaseapp.com",
    projectId: "twitter-clone-7b2ea",
    storageBucket: "twitter-clone-7b2ea.appspot.com",
    messagingSenderId: "486674478417",
    appId: "1:486674478417:web:53643f1679c6d7b521cf70",
    measurementId: "G-V91TZB74XF"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();

  export default db;