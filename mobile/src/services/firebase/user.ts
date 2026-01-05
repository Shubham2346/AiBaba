import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "./firebaseConfig";

const db = getFirestore();

export const createUserProfile = async (email: string) => {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);

  await setDoc(
    ref,
    {
      uid: user.uid,
      email,
      createdAt: new Date(),
    },
    { merge: true }
  );
};

export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
};
