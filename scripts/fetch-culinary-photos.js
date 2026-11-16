import fs from 'fs';
import https from 'https';

const downloads = [
  {
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
    dest: 'public/images/menu/ayam-goreng.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    dest: 'public/images/menu/tahu-tempe.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    dest: 'public/images/menu/ati-ampela.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    dest: 'public/images/menu/kol-goreng.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80',
    dest: 'public/images/menu/es-teh.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
    dest: 'public/images/menu/es-jeruk.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    dest: 'public/images/menu/kopi.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved ${dest}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of downloads) {
    try {
      await download(item.url, item.dest);
    } catch (e) {
      console.warn(`Could not download ${item.dest}:`, e.message);
    }
  }
}

run();

