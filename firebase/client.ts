import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAW7IPwiGafkuMjHGbKV-kes9ktlf3O-6s',
  authDomain: 'grillbot-fc746.firebaseapp.com',
  projectId: 'grillbot-fc746',
  storageBucket: 'grillbot-fc746.firebasestorage.app',
  messagingSenderId: '1016749824678',
  appId: '1:1016749824678:web:68af96183411a3ca017267',
  measurementId: 'G-FSSQ5F2Q7N',
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
