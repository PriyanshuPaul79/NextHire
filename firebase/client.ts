// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbOZd_OrStYJu8gRKo153QguoiXm_I90I",
  authDomain: "nexthire-d4e8f.firebaseapp.com",
  projectId: "nexthire-d4e8f",
  storageBucket: "nexthire-d4e8f.firebasestorage.app",
  messagingSenderId: "375511176578",
  appId: "1:375511176578:web:8fdb52f475f3974a50ab9b",
  measurementId: "G-5EFN5LHTBS"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)
