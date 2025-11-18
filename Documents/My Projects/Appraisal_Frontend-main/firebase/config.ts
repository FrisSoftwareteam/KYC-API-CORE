// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
// Ensure auth persists across tabs/sessions in the browser
try {
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
} catch (_) {
  // ignore if not in browser during SSR
}
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const micrsoftAuthProvider = new firebase.auth.OAuthProvider("microsoft.com");
// Improve UX and restrict to org accounts (adjust tenant as needed)
micrsoftAuthProvider.setCustomParameters({ prompt: "select_account", tenant: "organizations" });
// Add common scope; include more Graph scopes if your backend requires them
micrsoftAuthProvider.addScope("User.Read");

export { app, auth, googleAuthProvider, micrsoftAuthProvider };
