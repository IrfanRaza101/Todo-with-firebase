// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3NbYRbC-z7iseP4-zbEyPiWqzWlulvPs",
  authDomain: "todo-87ead.firebaseapp.com",
  projectId: "todo-87ead",
  storageBucket: "todo-87ead.firebasestorage.app",
  messagingSenderId: "653900435086",
  appId: "1:653900435086:web:a7fb6af66e36995a7fc3df",
  measurementId: "G-D4TXJFJPRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
