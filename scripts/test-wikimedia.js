import https from 'https';
import fs from 'fs';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AntigravityCulinaryBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function getWikimediaUrl(fileTitle) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetchJson(apiUrl);
  const pages = res.query.pages;
  const pageId = Object.keys(pages)[0];
  return pages[pageId].imageinfo[0].url;
}

async function run() {
  const files = [
    'File:Pecel Lele 1.JPG',
    'File:Ayam penyet.jpg',
    'File:Bebek Goreng Malang.JPG'
  ];

  for (const f of files) {
    try {
      const url = await getWikimediaUrl(f);
      console.log(f, '=>', url);
    } catch (e) {
      console.error(f, e.message);
    }
  }
}

run();

