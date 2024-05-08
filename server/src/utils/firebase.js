// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "task-manager-986f4.firebaseapp.com",
  projectId: "task-manager-986f4",
  storageBucket: "task-manager-986f4.appspot.com",
  messagingSenderId: "34021783430",
  appId: "1:34021783430:web:f7f6d6ba8510bd3aa29e07",
  measurementId: "G-QCFQEQD841"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);