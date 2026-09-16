const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'djbiwbdo';
const apiKey = process.env.CLOUDINARY_API_KEY || '558599488927594';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '23gKcHEJafO4Ih9Qa-5uJrybcvk';

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

async function uploadLocalFile(localFilePath, publicId, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      localFilePath,
      {
        folder: folder,
        public_id: publicId,
        overwrite: true,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: false,
        quality_analysis: true
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });
}

async function run() {
  console.log('=== DISCC India: Cloudinary High-Quality Media Sync ===');
  console.log(`Cloud Name: ${cloudName}`);

  const publicImagesDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
  if (!fs.existsSync(publicImagesDir)) {
    console.error('Images directory not found!');
    process.exit(1);
  }

  const allImages = getAllFiles(publicImagesDir).filter((f) =>
    /\.(png|jpe?g|webp|svg|gif)$/i.test(f)
  );

  console.log(`Found ${allImages.length} local platform images to upload at highest quality...`);

  const platformMap = {};
  const mapFilePath = path.join(__dirname, '..', 'frontend', 'src', 'lib', 'cloudinary_platform_images.json');

  let uploadSuccess = 0;
  for (const filePath of allImages) {
    const relFromPublic = path.relative(path.join(__dirname, '..', 'frontend', 'public'), filePath).replace(/\\/g, '/');
    const localUrl = '/' + relFromPublic;
    
    const ext = path.extname(filePath);
    const basename = path.basename(filePath, ext);
    const folderSub = path.dirname(relFromPublic).replace(/^images\/?/, '');
    const folder = folderSub ? `discc/${folderSub}` : 'discc/platform';

    try {
      console.log(`Uploading [${basename}] from ${localUrl}...`);
      const result = await uploadLocalFile(filePath, basename, folder);
      platformMap[localUrl] = {
        secure_url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        highQualityUrl: result.secure_url
      };
      uploadSuccess++;
      console.log(`  ✓ Uploaded to Cloudinary: ${result.secure_url}`);
    } catch (e) {
      console.error(`  ✗ Failed to upload ${localUrl}:`, e.message);
    }
  }

  fs.writeFileSync(mapFilePath, JSON.stringify(platformMap, null, 2));
  console.log(`\nPlatform images upload completed! Total uploaded: ${uploadSuccess}/${allImages.length}`);
  console.log(`Saved mapping to ${mapFilePath}`);
}

run();
