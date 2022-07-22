import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId:  process.env.REACT_APP_APIID,
    measurementId:process.env.REACT_APP_MEASUREMENTID
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db= firebaseApp.firestore();
  const auth= firebase.auth();

  export {auth, db};