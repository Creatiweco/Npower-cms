// migrate-to-cloudinary.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadDir = path.join(__dirname, 'public/uploads');

const uploadImages = async () => {
  const files = fs.readdirSync(uploadDir);

  for (const file of files) {
    const filePath = path.join(uploadDir, file);

    if (fs.statSync(filePath).isFile()) {
      console.log(`📤 Uploading: ${file}`);

      try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'strapi-migration', // Cloudinary'de klasör istersen
          use_filename: true,
          unique_filename: false,
          overwrite: false,
        });

        console.log(`✅ Uploaded: ${result.secure_url}`);
      } catch (err) {
        console.error(`❌ Error uploading ${file}:`, err.message);
      }
    }
  }

  console.log('🎉 Tüm dosyalar Cloudinary\'ye yüklendi.');
};

uploadImages();
