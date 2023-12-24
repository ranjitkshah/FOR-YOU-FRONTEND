// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkbcgMpwR9hGkMhx7Gv7jSddNI0vxwXXg",
  authDomain: "zaridhar.firebaseapp.com",
  projectId: "zaridhar",
  storageBucket: "zaridhar.appspot.com",
  messagingSenderId: "496581518471",
  appId: "1:496581518471:web:5db8285eb3a11d593cc422",
  measurementId: "G-JCH61DZY2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth };
