import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBi52OmFexev5F1mz7J4gq2ema95yXn7Q4",
  authDomain: "ivaldres-db6b8.firebaseapp.com",
  projectId: "ivaldres-db6b8",
  storageBucket: "ivaldres-db6b8.firebasestorage.app",
  messagingSenderId: "777863580476",
  appId: "1:777863580476:web:44c6b9a1fee7d321e76c39"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
