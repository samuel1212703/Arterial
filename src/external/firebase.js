import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDocs, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMxapLWs0Hugz6Z06VM-u8iBGa_3F6uIg",
  authDomain: "glossario-a1f7f.firebaseapp.com",
  projectId: "glossario-a1f7f",
  storageBucket: "glossario-a1f7f.appspot.com",
  messagingSenderId: "35671485008",
  appId: "1:35671485008:web:a66127da8da85700847f55",
  measurementId: "G-X8FPY2CSHZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Variables
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Functions
export function googleSignIn() {
  signInWithPopup(auth, provider);
}

