const fs = require('fs');
const path = require('path');
const { initializeApp } = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'firebase', 'app'));
const { getFirestore, doc, writeBatch, setDoc } = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'firebase', 'firestore'));

const firebaseConfig = {
  apiKey: "AIzaSyCV4CeYxkB0Mj7pv7y4xn2pNL-TgKLCua8",
  authDomain: "dissc-60e94.firebaseapp.com",
  projectId: "dissc-60e94",
  storageBucket: "dissc-60e94.firebasestorage.app",
  messagingSenderId: "396786272491",
  appId: "1:396786272491:web:b81ff74e04f38fe42396ae",
  measurementId: "G-30SF9XDPRS"
};

console.log('Connecting to live Firebase project "dissc-60e94"...');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const exportDir = path.join(__dirname, '..', 'frontend', 'firestore_export');

async function uploadCollection(collectionName, items, idField = 'id') {
  if (!items || !items.length) {
    console.log(`Skipping empty collection: ${collectionName}`);
    return;
  }

  console.log(`\nUploading ${items.length} documents to collection "${collectionName}"...`);
  const chunkSize = 400;
  let totalUploaded = 0;

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const batch = writeBatch(db);

    for (const item of chunk) {
      const docId = item[idField] !== undefined && item[idField] !== null ? String(item[idField]) : undefined;
      const ref = docId ? doc(db, collectionName, docId) : doc(db, collectionName);
      batch.set(ref, {
        ...item,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }

    try {
      await batch.commit();
      totalUploaded += chunk.length;
      console.log(`  ✓ Committed batch (${totalUploaded}/${items.length})`);
    } catch (err) {
      console.error(`  ✗ Error in batch write to "${collectionName}":`, err.message);
      if (err.message && err.message.includes('permission-denied')) {
        console.error('\n[FIRESTORE PERMISSION DENIED]');
        console.error('Firestore Security Rules in project dissc-60e94 are currently blocking unauthenticated writes.');
        console.error('To fix this: Open Firebase Console -> Firestore Database -> Rules tab.');
        console.error('Set:');
        console.error('rules_version = \'2\';');
        console.error('service cloud.firestore {');
        console.error('  match /databases/{database}/documents {');
        console.error('    match /{document=**} {');
        console.error('      allow read, write: if true;');
        console.error('    }');
        console.error('  }');
        console.error('}');
        console.error('And click Publish.\n');
        throw err;
      }
      throw err;
    }
  }

  console.log(`✓ Completed "${collectionName}": ${totalUploaded} docs.`);
}

async function run() {
  const startTime = Date.now();
  try {
    const plan = [
      { file: 'pages.json', collection: 'pages' },
      { file: 'blogs.json', collection: 'blogs' },
      { file: 'galleries.json', collection: 'galleries' },
      { file: 'teams.json', collection: 'teams' },
      { file: 'testimonials.json', collection: 'testimonials' },
      { file: 'faqs.json', collection: 'faqs' },
      { file: 'categories.json', collection: 'categories' },
      { file: 'tags.json', collection: 'tags' },
      { file: 'contacts.json', collection: 'contacts' },
      { file: 'media.json', collection: 'media' }
    ];

    let totalDocs = 0;

    for (const item of plan) {
      const filePath = path.join(exportDir, item.file);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        totalDocs += data.length;
        await uploadCollection(item.collection, data, 'id');
      }
    }

    // Upload site settings document
    const settingsPath = path.join(exportDir, 'settings.json');
    if (fs.existsSync(settingsPath)) {
      const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      if (settingsData.dict) {
        console.log('\nUploading site settings document to "settings/site_config"...');
        const settingsRef = doc(db, 'settings', 'site_config');
        await setDoc(settingsRef, {
          ...settingsData.dict,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
        console.log('✓ Uploaded settings/site_config');
        totalDocs += 1;
      }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n======================================================');
    console.log(`🎉 SUCCESS! All ${totalDocs} documents uploaded to Firestore!`);
    console.log(`Time taken: ${elapsed}s`);
    console.log('======================================================\n');
    process.exit(0);
  } catch (err) {
    console.error('\n[Migration Stopped]:', err.message);
    process.exit(1);
  }
}

run();
