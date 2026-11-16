import https from 'https';
import fs from 'fs';
import sharp from 'sharp';

function downloadFile(url, tempDest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tempDest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
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

async function run() {
  const list = [
    { name: 'fish-sambal-1.jpg', url: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=1200&auto=format&fit=crop&q=92' },
    { name: 'fish-crispy-2.jpg', url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1200&auto=format&fit=crop&q=92' },
    { name: 'indonesian-feast-3.jpg', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&auto=format&fit=crop&q=92' },
    { name: 'warung-dining-about.jpg', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=92' },
    { name: 'warm-kitchen-about.jpg', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=92' }
  ];

  for (const item of list) {
    try {
      await downloadFile(item.url, 'temp_' + item.name);
      const meta = await sharp('temp_' + item.name).metadata();
      console.log(item.name, 'OK:', meta.width, 'x', meta.height);
    } catch (e) {
      console.error(item.name, 'failed:', e.message);
    }
  }
}

run();

