
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAtGfWWBcv457Ba5ALsiEAZdFu9fqQQhNo",
  authDomain: "urban-c348d.firebaseapp.com",
  projectId: "urban-c348d",
  storageBucket: "urban-c348d.firebasestorage.app",
  messagingSenderId: "104142048212",
  appId: "1:104142048212:web:586b924e091111617c6441",
  measurementId: "G-LDYWBZSV6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);