// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCV4rOtJPC2wciaOtgbdGfprsEU_E4tY0",
  authDomain: "hismap-b8ae0.firebaseapp.com",
  projectId: "hismap-b8ae0",
  storageBucket: "hismap-b8ae0.appspot.com",
  messagingSenderId: "171226342253",
  appId: "1:171226342253:web:6e52887ffbe60279d2b064",
  measurementId: "G-EMGMHXTPW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// firestore export
export { db, analytics }
