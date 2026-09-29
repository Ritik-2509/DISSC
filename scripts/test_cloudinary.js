const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'djbiwbdo',
  api_key: '558599488927594',
  api_secret: '23gKcHEJafO4Ih9Qa-5uJrybcvk',
  secure: true
});

cloudinary.api.ping((err, res) => {
  if (err) {
    console.error('Cloudinary ping failed:', err.message);
  } else {
    console.log('Cloudinary connected successfully:', res);
  }
});
