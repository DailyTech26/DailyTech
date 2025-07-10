// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCnpXqKasnM2hqb-Q2BvzRuhDvDD4i-4e4",
  authDomain: "dailytech-b0f69.firebaseapp.com",
  projectId: "dailytech-b0f69",
  storageBucket: "dailytech-b0f69.appspot.com",
  messagingSenderId: "62116729328",
  appId: "1:62116729328:web:ccdf43e2c3df8f8e9ecd35"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };
