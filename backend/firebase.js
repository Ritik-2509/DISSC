const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const { getAuth } = require("firebase-admin/auth");
const path = require("path");

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

let app;

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

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

module.exports = { db, storage, auth };
