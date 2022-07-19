import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzrI1FUAfoFWxWG9-mSHlt4-MXW03gsLM",
    authDomain: "clone-4f7d0.firebaseapp.com",
    projectId: "clone-4f7d0",
    storageBucket: "clone-4f7d0.appspot.com",
    messagingSenderId: "655745677129",
    appId: "1:655745677129:web:15cd95203e3d20b55e0c98",
    measurementId: "G-3RKM6J6JPT"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db= firebaseApp.firestore();
  const auth= firebase.auth();

  export {auth, db};