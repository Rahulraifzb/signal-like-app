import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyAMZ748K8yAFJ3LzZ2kJJLlBPhRwTHTRF8",
    authDomain: "signal-like-app.firebaseapp.com",
    projectId: "signal-like-app",
    storageBucket: "signal-like-app.appspot.com",
    messagingSenderId: "587791494604",
    appId: "1:587791494604:web:6a92e9baafd16ca45d0169",
    measurementId: "G-FBKSHZ496D"
  };

let firebaseApp;
if (firebase.apps.length === 0){
  firebaseApp = firebase.initializeApp(firebaseConfig)
}else{
  firebaseApp = firebase.app()
}

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

export {db,auth}


