import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0LnYcF5dUcPeMqFipQMt9pvlw7r_CtsY",
  authDomain: "aibaba-14b72.firebaseapp.com",
  projectId: "aibaba-14b72",
  storageBucket: "aibaba-14b72.firebasestorage.app",
  messagingSenderId: "626408823954",
  appId: "1:626408823954:web:7ace7043fd6c9b12e19a4b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default firebaseConfig;