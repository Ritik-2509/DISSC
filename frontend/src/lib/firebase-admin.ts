import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";
import path from "path";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

let app;

if (!getApps().length) {
  if (serviceAccountPath) {
    const serviceAccount = require(path.resolve(serviceAccountPath));
    app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: "dissc-60e94.firebasestorage.app",
    });
  } else {
    // Fallback to application default credentials
    app = initializeApp({
      storageBucket: "dissc-60e94.firebasestorage.app",
    });
  }
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
