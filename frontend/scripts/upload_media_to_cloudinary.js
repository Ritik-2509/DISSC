const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, writeBatch } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyCV4CeYxkB0Mj7pv7y4xn2pNL-TgKLCua8',
  authDomain: 'dissc-60e94.firebaseapp.com',
  projectId: 'dissc-60e94',
  storageBucket: 'dissc-60e94.firebasestorage.app',
  messagingSenderId: '396786272491',
  appId: '1:396786272491:web:b81ff74e04f38fe42396ae'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

cloudinary.config({
  cloud_name: 'djbiwbdo',
  api_key: '558599488927594',
  api_secret: '23gKcHEJafO4Ih9Qa-5uJrybcvk',
  secure: true
});

const mediaPath = path.join(__dirname, '..', 'firestore_export', 'media.json');
const publicMediaPath = path.join(__dirname, '..', 'public', 'firestore_export', 'media.json');
const mapPath = path.join(__dirname, '..', 'src', 'lib', 'cloudinary_media_map.json');

let mediaMap = {};
if (fs.existsSync(mapPath)) {
  try {
    mediaMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  } catch (e) {}
}

async function uploadSingle(url, publicId) {
  if (mediaMap[url]) return mediaMap[url];
  try {
    const res = await cloudinary.uploader.upload(url, {
      folder: 'discc/media',
      public_id: publicId,
      resource_type: 'auto',
      quality_analysis: true
    });
    mediaMap[url] = res.secure_url;
    return res.secure_url;
  } catch (err) {
    console.warn(`[!] Skip upload for ${url}: ${err.message}`);
    return url;
  }
}

async function run() {
  console.log('=== DISCC India: Migrating Media Library to Cloudinary ===');
  const mediaItems = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));
  console.log(`Loaded ${mediaItems.length} media records.`);

  let updatedCount = 0;
  for (let i = 0; i < mediaItems.length; i++) {
    const item = mediaItems[i];
    if (!item.fullUrl || !item.fullUrl.startsWith('http')) continue;

    const rawName = typeof item.name === 'string' ? item.name : (typeof item.url === 'string' ? item.url : `file_${item.id}`);
    const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const publicId = `${item.id}_${cleanName}`.slice(0, 100);

    const cloudUrl = await uploadSingle(item.fullUrl, publicId);
    if (cloudUrl !== item.fullUrl) {
      item.cloudinaryUrl = cloudUrl;
      item.fullUrl = cloudUrl;
      updatedCount++;
    }

    if ((i + 1) % 25 === 0) {
      console.log(`[Media ${i + 1}/${mediaItems.length}] Uploaded ${updatedCount} files...`);
      fs.writeFileSync(mapPath, JSON.stringify(mediaMap, null, 2));
    }
  }

  fs.writeFileSync(mapPath, JSON.stringify(mediaMap, null, 2));
  fs.writeFileSync(mediaPath, JSON.stringify(mediaItems, null, 2));
  fs.writeFileSync(publicMediaPath, JSON.stringify(mediaItems, null, 2));

  console.log(`\nMedia upload finished! Total synced: ${updatedCount}`);
  console.log(`Updating live Firestore "media" collection in batches...`);

  // Batch commit to Firestore (500 docs per batch)
  const batchSize = 400;
  for (let i = 0; i < mediaItems.length; i += batchSize) {
    const chunk = mediaItems.slice(i, i + batchSize);
    const batch = writeBatch(db);
    for (const docData of chunk) {
      const docRef = doc(db, 'media', String(docData.id));
      batch.set(docRef, docData, { merge: true });
    }
    await batch.commit();
    console.log(`  ✓ Committed Firestore batch (${Math.min(i + batchSize, mediaItems.length)}/${mediaItems.length})`);
  }

  console.log('✓ Successfully synced all media items to Cloudinary and live Firestore!');
}

run().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
