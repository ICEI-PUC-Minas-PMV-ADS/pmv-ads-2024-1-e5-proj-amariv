import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup  } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const fireApp = initializeApp(firebaseConfig);
export const fireAuth = getAuth(fireApp);

/**
 * Sign in with google.
 */

export async function signWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return await signInWithPopup(fireAuth, provider);
}