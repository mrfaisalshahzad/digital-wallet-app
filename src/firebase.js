import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW-7RHiJGvsi1a_ayKZgl6RN-xIleqwxs",
  authDomain: "my-digitalwallet-app.firebaseapp.com",
  projectId: "my-digitalwallet-app",
  storageBucket: "my-digitalwallet-app.firebasestorage.app",
  messagingSenderId: "259716418542",
  appId: "1:259716418542:web:1884b35276e02a412edcff",
  measurementId: "G-MX3KXPN36P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
