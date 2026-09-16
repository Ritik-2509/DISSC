const { v2: cloudinary } = require('cloudinary');
const { initializeApp } = require('firebase/app');
const { getFirestore, getDocs, collection, limit, query } = require('firebase/firestore');
const path = require('path');
const fs = require('fs');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      process.env[key] = val;
    }
  }
}

async function testCloudinary() {
  console.log('--- TESTING CLOUDINARY ---');
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const pingRes = await cloudinary.api.ping();
    console.log('Cloudinary Ping Success:', pingRes);

    const usageRes = await cloudinary.api.usage();
    console.log('Cloudinary Usage Account Status: OK. Plan:', usageRes.plan, '| Credits:', usageRes.credits?.usage || 'N/A');
    return { ok: true, status: 'Connected' };
  } catch (err) {
    console.error('Cloudinary Test FAILED:', err.message);
    return { ok: false, error: err.message };
  }
}

async function testFirestore() {
  console.log('\n--- TESTING FIRESTORE (DATABASE) ---');
  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const collectionsToTest = ['testimonials', 'galleries', 'blogs', 'teams', 'pages', 'settings'];
    const results = {};

    for (const col of collectionsToTest) {
      const q = query(collection(db, col), limit(3));
      const snapshot = await getDocs(q);
      results[col] = {
        empty: snapshot.empty,
        docCountReturned: snapshot.size,
      };
    }

    console.log('Firestore Query Results:', JSON.stringify(results, null, 2));
    return { ok: true, results };
  } catch (err) {
    console.error('Firestore Test FAILED:', err.message);
    return { ok: false, error: err.message };
  }
}

async function main() {
  const cRes = await testCloudinary();
  const fRes = await testFirestore();
  console.log('\n--- SUMMARY ---');
  console.log('Cloudinary:', cRes.ok ? 'PASS' : 'FAIL');
  console.log('Firestore:', fRes.ok ? 'PASS' : 'FAIL');
  process.exit(cRes.ok && fRes.ok ? 0 : 1);
}

main();
