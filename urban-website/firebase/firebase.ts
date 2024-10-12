import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCjmT7BWmyzetW24RKLowF709EApn1dNVE",
  authDomain: "urban-c348d.firebaseapp.com",
  projectId: "urban-c348d",
  storageBucket: "urban-c348d.appspot.com",
  messagingSenderId: "104142048212",
  appId: "1:104142048212:web:7b69a81558c45af27c6441",
  measurementId: "G-TDBB415HP0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default app
export {auth}