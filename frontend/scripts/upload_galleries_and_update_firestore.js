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

const galleriesPath = path.join(__dirname, '..', 'firestore_export', 'galleries.json');
const publicGalleriesPath = path.join(__dirname, '..', 'public', 'firestore_export', 'galleries.json');
const mapPath = path.join(__dirname, '..', 'src', 'lib', 'cloudinary_gallery_map.json');

let galleryMap = {};
if (fs.existsSync(mapPath)) {
  try {
    galleryMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  } catch (e) {}
}

async function uploadUrlToCloudinary(url, folder) {
  if (!url || !url.startsWith('http')) return url;
  if (galleryMap[url]) return galleryMap[url];

  try {
    const res = await cloudinary.uploader.upload(url, {
      folder: folder,
      resource_type: 'image',
      quality_analysis: true
    });
    galleryMap[url] = res.secure_url;
    return res.secure_url;
  } catch (err) {
    console.warn(`[!] Cloudinary upload skip for ${url}: ${err.message}`);
    return url;
  }
}

async function run() {
  console.log('=== DISCC India: Migrating 44 Galleries to Cloudinary & Live Firestore ===');
  const galleries = JSON.parse(fs.readFileSync(galleriesPath, 'utf8'));
  console.log(`Loaded ${galleries.length} gallery albums.`);

  let totalUploaded = 0;

  for (let i = 0; i < galleries.length; i++) {
    const gal = galleries[i];
    console.log(`\n[Album ${i + 1}/${galleries.length}] Processing "${gal.name}"...`);

    // 1. Cover image
    if (gal.imageUrl && gal.imageUrl.startsWith('http')) {
      const cloudCover = await uploadUrlToCloudinary(gal.imageUrl, 'discc/galleries/covers');
      if (cloudCover !== gal.imageUrl) {
        gal.imageUrl = cloudCover;
        gal.cloudinaryCover = cloudCover;
        totalUploaded++;
      }
    }

    // 2. Photos in album
    if (Array.isArray(gal.images) && gal.images.length > 0) {
      for (let j = 0; j < gal.images.length; j++) {
        const item = gal.images[j];
        const rawUrl = item.img.startsWith('http')
          ? item.img
          : `https://disccindia.org/storage/${item.img.replace(/^\/+/, '')}`;

        const cloudUrl = await uploadUrlToCloudinary(rawUrl, 'discc/galleries/photos');
        if (cloudUrl !== rawUrl) {
          item.img = cloudUrl;
          item.cloudinaryUrl = cloudUrl;
          totalUploaded++;
        }
      }
    }

    // Save map periodically
    if ((i + 1) % 5 === 0) {
      fs.writeFileSync(mapPath, JSON.stringify(galleryMap, null, 2));
    }
  }

  fs.writeFileSync(mapPath, JSON.stringify(galleryMap, null, 2));
  fs.writeFileSync(galleriesPath, JSON.stringify(galleries, null, 2));
  fs.writeFileSync(publicGalleriesPath, JSON.stringify(galleries, null, 2));

  console.log(`\nLocal gallery JSON files updated with Cloudinary URLs.`);
  console.log(`Now updating live Firestore "galleries" collection...`);

  // Batch update Firestore
  const batch = writeBatch(db);
  for (const gal of galleries) {
    const docRef = doc(db, 'galleries', String(gal.id));
    batch.set(docRef, gal, { merge: true });
  }
  await batch.commit();

  console.log(`✓ All 44 gallery albums updated with Cloudinary URLs in live Firestore!`);
  console.log(`Total images migrated to Cloudinary: ${totalUploaded}`);
}

run().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
