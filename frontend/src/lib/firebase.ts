import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCV4CeYxkB0Mj7pv7y4xn2pNL-TgKLCua8",
  authDomain: "dissc-60e94.firebaseapp.com",
  projectId: "dissc-60e94",
  storageBucket: "dissc-60e94.firebasestorage.app",
  messagingSenderId: "396786272491",
  appId: "1:396786272491:web:b81ff74e04f38fe42396ae",
  measurementId: "G-30SF9XDPRS"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const storage = getStorage(app);

// Analytics is only available in browser environments
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, storage, analytics };
