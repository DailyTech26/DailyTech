import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "
AIzaSyCnpXqKasnM2hqb-Q2BvzRuhDvDD4i-4e4",
  authDomain: "dailytech-b0f69.web.app","daily2k.org","dailytech-b0f69.firebaseapp.com",
  projectId: "dailytech-b0f69",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "62116729328",
  appId: "1:62116729328:web:ccdf43e2c3df8f8e9ecd35
",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
