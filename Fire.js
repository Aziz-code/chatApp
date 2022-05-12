import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBe9BVohX44APRC0APUOBgSWhKrSfyJDJk",
  authDomain: "chatapp-790c6.firebaseapp.com",
  databaseURL: "https://chatapp-790c6-default-rtdb.firebaseio.com",
  projectId: "chatapp-790c6",
  storageBucket: "chatapp-790c6.appspot.com",
  messagingSenderId: "494150645421",
  appId: "1:494150645421:web:92e1ce9eb6746835eab824",
  measurementId: "G-DYJLBJJ1ZM"
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };