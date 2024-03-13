// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyC7H1WUjOL_aMXV6luG-fBLN1uMSYOyumA",
  authDomain: "mern-auth-f0ed3.firebaseapp.com",
  projectId: "mern-auth-f0ed3",
  storageBucket: "mern-auth-f0ed3.appspot.com",
  messagingSenderId: "473300667327",
  appId: "1:473300667327:web:136206a65a578e473b2f0a",
  measurementId: "G-12Y5RNHFM4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
