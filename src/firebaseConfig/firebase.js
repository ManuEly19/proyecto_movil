import { initializeApp, } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyABtHceM0AhTaTA-bH14i5-Pyzq8uDoxNo",
  authDomain: "proyecto-866d0.firebaseapp.com",
  databaseURL: "https://proyecto-866d0-default-rtdb.firebaseio.com",
  projectId: "proyecto-866d0",
  storageBucket: "proyecto-866d0.appspot.com",
  messagingSenderId: "861798566058",
  appId: "1:861798566058:web:da659b3367bc593d36a8d3"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
const authOther = getAuth(app);

export { auth, db, authOther };
