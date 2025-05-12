import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBi52OmFexev5F1mz7J4gq2ema95yXn7Q4",
  authDomain: "ivaldres-db6b8.firebaseapp.com",
  projectId: "ivaldres-db6b8",
  storageBucket: "ivaldres-db6b8.firebasestorage.app",
  messagingSenderId: "777863580476",
  appId: "1:777863580476:web:44c6b9a1fee7d321e76c39"
};

// Initialize Firebase
let app;
let db: Firestore;
let storage: FirebaseStorage;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Log successful initialization
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { app, db, storage };
