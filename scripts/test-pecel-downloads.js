import https from 'https';
import fs from 'fs';
import sharp from 'sharp';

function downloadFile(url, tempDest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tempDest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
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

async function testDownload() {
  const candidates = [
    { name: 'pecel_uduk.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Nasi_Uduk_Pecel_Lele.jpg' },
    { name: 'pecel_lamongan.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Nasi_Pecel_Lele_Lamongan_Di_Gombong_Kebumen_Jateng_Indonesia.jpg' },
    { name: 'about_warung_dining.jpg', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=90' }
  ];

  for (const c of candidates) {
    try {
      await downloadFile(c.url, 'temp_' + c.name);
      const meta = await sharp('temp_' + c.name).metadata();
      console.log(c.name, 'downloaded:', meta.width, 'x', meta.height);
    } catch (e) {
      console.warn(c.name, 'failed:', e.message);
    }
  }
}

testDownload();

