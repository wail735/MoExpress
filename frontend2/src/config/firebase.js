// ============================================================================
// CONFIG : firebase.js
// ROLE : Firebase Initialization & Google Authentication Provider
// ============================================================================

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBqMTA_xISpB5ximdNMbABKXL2oNWayic",
  authDomain: "moexpress-7f966.firebaseapp.com",
  projectId: "moexpress-7f966",
  storageBucket: "moexpress-7f966.firebasestorage.app",
  messagingSenderId: "928016085039",
  appId: "1:928016085039:web:df640dabc6c48a005396da",
  measurementId: "G-X2J7FEYXL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics conditionally
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

// Google Sign-In helper function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      success: true,
      user: {
        name: user.displayName || "Google User",
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        role: "buyer",
        isProShop: false,
        coins: 100,
      },
      token: await user.getIdToken(),
    };
  } catch (error) {
    console.error("Firebase Google Auth Error:", error.message);
    throw error;
  }
};

export { app, auth, analytics, googleProvider };
