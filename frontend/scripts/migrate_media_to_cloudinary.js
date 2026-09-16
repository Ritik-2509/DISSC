const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.log('\n[!] Cloudinary credentials are not set in environment.');
  console.log('To run this migration, set in your terminal or .env.local:');
  console.log('CLOUDINARY_CLOUD_NAME=your_cloud_name');
  console.log('CLOUDINARY_API_KEY=your_api_key');
  console.log('CLOUDINARY_API_SECRET=your_api_secret\n');
  process.exit(0);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const mediaJsonPath = path.join(__dirname, '..', 'frontend', 'firestore_export', 'media.json');

if (!fs.existsSync(mediaJsonPath)) {
  console.error('media.json not found in firestore_export. Run sql_parser.js first.');
  process.exit(1);
}

const mediaFiles = JSON.parse(fs.readFileSync(mediaJsonPath, 'utf8'));
console.log(`Loaded ${mediaFiles.length} media files to migrate to Cloudinary...`);

async function uploadToCloudinary(url, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      url,
      {
        folder: 'discc/media',
        public_id: publicId,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
}

async function run() {
  const mapFile = path.join(__dirname, '..', 'frontend', 'firestore_export', 'cloudinary_map.json');
  let map = {};
  if (fs.existsSync(mapFile)) {
    try {
      map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch (e) {}
  }

  let migratedCount = 0;
  for (let i = 0; i < mediaFiles.length; i++) {
    const item = mediaFiles[i];
    if (map[item.id]) {
      continue;
    }

    if (!item.fullUrl || !item.fullUrl.startsWith('http')) {
      continue;
    }

    const cleanName = (item.name || `file_${item.id}`).replace(/[^a-zA-Z0-9_-]/g, '_');
    const publicId = `${item.id}_${cleanName}`;

    try {
      const result = await uploadToCloudinary(item.fullUrl, publicId);
      map[item.id] = result.secure_url;
      item.cloudinaryUrl = result.secure_url;
      migratedCount++;
      console.log(`[${migratedCount}] Uploaded: ${item.name} -> ${result.secure_url}`);

      if (migratedCount % 20 === 0) {
        fs.writeFileSync(mapFile, JSON.stringify(map, null, 2));
      }
    } catch (err) {
      console.warn(`Could not upload ${item.fullUrl}:`, err.message);
    }
  }

  fs.writeFileSync(mapFile, JSON.stringify(map, null, 2));
  fs.writeFileSync(mediaJsonPath, JSON.stringify(mediaFiles, null, 2));
  console.log(`\nFinished! Total new uploads: ${migratedCount}`);
}

run();
