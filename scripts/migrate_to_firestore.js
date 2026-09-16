const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const exportDir = path.join(__dirname, '..', 'frontend', 'firestore_export');

if (!fs.existsSync(exportDir)) {
  console.error('Export directory not found. Please run "node scripts/sql_parser.js" first.');
  process.exit(1);
}

// Check for service account
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || path.join(__dirname, '..', 'frontend', 'serviceAccountKey.json');

if (fs.existsSync(serviceAccountPath)) {
  console.log(`Using service account: ${serviceAccountPath}`);
  const serviceAccount = require(path.resolve(serviceAccountPath));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "dissc-60e94.firebasestorage.app",
  });
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  console.log('Using service account from FIREBASE_SERVICE_ACCOUNT_JSON');
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "dissc-60e94.firebasestorage.app",
  });
} else {
  console.warn('\n[!] No serviceAccountKey.json found.');
  console.warn('To upload directly to live Firebase from CLI:');
  console.warn('1. Download service account private key from Firebase Console (Project Settings > Service accounts)');
  console.warn('2. Save it as frontend/serviceAccountKey.json');
  console.warn('3. Re-run: node scripts/migrate_to_firestore.js\n');
  console.log('Attempting Application Default Credentials or fallback...');
  try {
    admin.initializeApp({
      projectId: "dissc-60e94",
      storageBucket: "dissc-60e94.firebasestorage.app",
    });
  } catch (e) {
    console.error('Could not initialize Firebase Admin:', e.message);
    process.exit(1);
  }
}

const db = admin.firestore();

async function batchUpload(collectionName, items, idField = 'id') {
  if (!items || !items.length) {
    console.log(`Skipping empty collection ${collectionName}`);
    return;
  }

  console.log(`\nUploading ${items.length} documents to collection "${collectionName}"...`);
  const chunkSize = 400;
  let uploaded = 0;

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const batch = db.batch();

    for (const item of chunk) {
      const docId = item[idField] !== undefined && item[idField] !== null ? String(item[idField]) : undefined;
      const ref = docId ? db.collection(collectionName).doc(docId) : db.collection(collectionName).doc();
      batch.set(ref, {
        ...item,
        migratedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }

    try {
      await batch.commit();
      uploaded += chunk.length;
      console.log(`  ✓ Committed batch (${uploaded}/${items.length})`);
    } catch (err) {
      console.error(`  ✗ Error uploading batch to ${collectionName}:`, err.message);
      throw err;
    }
  }

  console.log(`✓ Finished "${collectionName}": ${uploaded} documents uploaded.`);
}

async function run() {
  try {
    const collections = [
      { file: 'pages.json', collection: 'pages', idField: 'id' },
      { file: 'blogs.json', collection: 'blogs', idField: 'id' },
      { file: 'galleries.json', collection: 'galleries', idField: 'id' },
      { file: 'teams.json', collection: 'teams', idField: 'id' },
      { file: 'testimonials.json', collection: 'testimonials', idField: 'id' },
      { file: 'faqs.json', collection: 'faqs', idField: 'id' },
      { file: 'categories.json', collection: 'categories', idField: 'id' },
      { file: 'tags.json', collection: 'tags', idField: 'id' },
      { file: 'contacts.json', collection: 'contacts', idField: 'id' },
      { file: 'media.json', collection: 'media', idField: 'id' }
    ];

    for (const col of collections) {
      const filePath = path.join(exportDir, col.file);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        await batchUpload(col.collection, data, col.idField);
      }
    }

    // Upload settings dict
    const settingsPath = path.join(exportDir, 'settings.json');
    if (fs.existsSync(settingsPath)) {
      const settingsData = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      if (settingsData.dict) {
        console.log('\nUploading global site settings document...');
        await db.collection('settings').doc('site_config').set({
          ...settingsData.dict,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        console.log('✓ Uploaded settings/site_config');
      }
    }

    console.log('\n==========================================');
    console.log('🎉 ALL DATA SUCCESSFULLY MIGRATED TO FIRESTORE!');
    console.log('==========================================\n');
  } catch (err) {
    console.error('\n[Migration Error]:', err.message);
  }
}

run();
