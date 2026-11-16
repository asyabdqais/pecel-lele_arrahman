import https from 'https';
import fs from 'fs';
import sharp from 'sharp';

function downloadFile(url, tempDest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tempDest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, tempDest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(tempDest, () => {});
      reject(err);
    });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log('Processing photos...');

  // 1. Ayam Penyet (Crispy Indonesian Fried Chicken Sambal - High-Res Unsplash Curated)
  const ayamUrl = 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1000&auto=format&fit=crop&q=90';
  const tempAyam = 'temp_ayam.jpg';
  await downloadFile(ayamUrl, tempAyam);
  await sharp(tempAyam)
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92 })
    .toFile('public/images/menu/ayam-penyet.jpg');
  console.log('public/images/menu/ayam-penyet.jpg created (800x600 HD)');

  // 2. Bebek Goreng (Crispy Spiced Duck - High-Res Unsplash Curated)
  const bebekUrl = 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=1000&auto=format&fit=crop&q=90';
  const tempBebek = 'temp_bebek.jpg';
  await downloadFile(bebekUrl, tempBebek);
  await sharp(tempBebek)
    .resize(800, 600, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92 })
    .toFile('public/images/menu/bebek-goreng.jpg');
  console.log('public/images/menu/bebek-goreng.jpg created (800x600 HD)');

  // 3. About: Warm authentic Indonesian warung dining atmosphere (High-Res 1200x800)
  const aboutUrl = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=90';
  const tempAbout = 'temp_about.jpg';
  await downloadFile(aboutUrl, tempAbout);
  await sharp(tempAbout)
    .resize(1000, 750, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92 })
    .toFile('public/images/about-warung.jpg');
  console.log('public/images/about-warung.jpg created (1000x750 HD)');

  // Cleanup
  [tempAyam, tempBebek, tempAbout].forEach(f => {
    try { fs.unlinkSync(f); } catch (e) {}
  });

  console.log('ALL PHOTOS SUCCESSFULLY UPDATED TO CRISP HD RESOLUTION!');
}

run().catch(console.error);
