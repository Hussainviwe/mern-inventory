// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-inventory-3d09c.firebaseapp.com",
  projectId: "mern-inventory-3d09c",
  storageBucket: "mern-inventory-3d09c.firebasestorage.app",
  messagingSenderId: "987531136469",
  appId: "1:987531136469:web:291fa7d59a0cbe39e8815c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const itemsCollection = collection(db, "inventory"); // Firestore collection reference

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, itemsCollection, auth };
