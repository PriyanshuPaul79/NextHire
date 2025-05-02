// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_API,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);