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

async function listCategory(cat) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(cat)}&cmlimit=20&format=json`;
  const res = await fetchJson(url);
  console.log(cat, res.query.categorymembers);
}

listCategory('Pecel_lele');
listCategory('Warung');

