// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5VUK8v1Bs2m-exlnbuaKqr1nBtLlA3t8",
  authDomain: "hgu-map.firebaseapp.com",
  projectId: "hgu-map",
  storageBucket: "hgu-map.appspot.com",
  messagingSenderId: "307792554676",
  appId: "1:307792554676:web:5e1f6944e68de30a8fc5e1",
  measurementId: "G-XMBPTCYX9K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// firestore export
export { db, analytics };
