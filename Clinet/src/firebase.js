// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_eeRJOYvXugnPXX22m2_K3SrIjGzm99Q",
  authDomain: "inventory-7668a.firebaseapp.com",
  databaseURL: "https://inventory-7668a-default-rtdb.firebaseio.com",
  projectId: "inventory-7668a",
  storageBucket: "inventory-7668a.firebasestorage.app",
  messagingSenderId: "682463844187",
  appId: "1:682463844187:web:bdc083fa55d774183b6c7e",
  measurementId: "G-LGLJCFWG1C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const itemsCollection = collection(db, "inventory"); // Firestore collection reference

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, itemsCollection, auth };