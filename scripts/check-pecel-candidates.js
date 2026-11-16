import https from 'https';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AntigravityCulinaryBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function getWikimediaUrl(fileTitle) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
  const res = await fetchJson(apiUrl);
  const pages = res.query.pages;
  const pageId = Object.keys(pages)[0];
  return pages[pageId].imageinfo ? pages[pageId].imageinfo[0].url : null;
}

async function run() {
  const files = [
    'File:Nasi Uduk Pecel Lele.jpg',
    'File:Nasi Pecel Lele Lamongan Di Gombong Kebumen Jateng Indonesia.jpg',
    'File:Lele Goreng 203802.jpg'
  ];

  for (const f of files) {
    const url = await getWikimediaUrl(f);
    console.log(f, '=>', url);
  }
}

run();

