// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnpXqKasnM2hqb-Q2BvzRuhDvDD4i-4e4",
  authDomain: "dailytech-b0f69.web.app",
  projectId: "dailytech-b0f69",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "62116729328",
  appId: "1:62116729328:web:ccdf43e2c3df8f8e9ecd35"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
