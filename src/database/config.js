import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDB1ROo9fstSnJwGVK1gXamIcjfgIvEBPQ",
  authDomain: "todoapp-958e7.firebaseapp.com",
  projectId: "todoapp-958e7",
  storageBucket: "todoapp-958e7.appspot.com",
  messagingSenderId: "338104876525",
  appId: "1:338104876525:web:489883944addeabcb9bbe4",
  measurementId: "G-8RJKF7NESY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
