import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signupWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import { auth } from "./firebaseConfig";

// export const login = (email: string, password: string) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// export const register = (email: string, password: string) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// export const logout = () => {
//   return signOut(auth);
// };
