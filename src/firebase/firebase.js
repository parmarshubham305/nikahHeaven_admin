import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Epicbae
const firebaseConfig = {
  apiKey: "AIzaSyAlJSmfUC9rNzGg5CMDdv9TAgxG-WyaKcc",
  authDomain: "nikahheaven-77.firebaseapp.com",
  databaseURL: "https://nikahheaven-77-default-rtdb.firebaseio.com",
  projectId: "nikahheaven-77",
  storageBucket: "nikahheaven-77.appspot.com",
  messagingSenderId: "602164921281",
  appId: "1:602164921281:web:90263203b9e46391c12540",
  measurementId: "G-15Y4P8MRKC"
};

initializeApp (firebaseConfig);
const auth = getAuth ();
const db = getFirestore ();

export {auth, db};
