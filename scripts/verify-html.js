import fs from 'fs';

const html = fs.readFileSync('dist/index.html', 'utf8');

const checks = [
  { name: 'Title Tag', ok: html.includes('<title>') },
  { name: 'Meta Description', ok: html.includes('name="description"') },
  { name: 'Open Graph Title', ok: html.includes('property="og:title"') },
  { name: 'Open Graph Image', ok: html.includes('property="og:image"') },
  { name: 'Canonical URL', ok: html.includes('rel="canonical"') },
  { name: 'JSON-LD Schema', ok: html.includes('application/ld+json') },
  { name: 'Restaurant Type in Schema', ok: html.includes('"@type":"Restaurant"') },
  { name: 'WhatsApp Link', ok: html.includes('wa.me/6281275070044') },
  { name: 'Instagram Link', ok: html.includes('instagram.com/pecel_lele_al.rahman') },
  { name: 'Google Maps Link', ok: html.includes('google.com/maps') },
  { name: 'Section #beranda', ok: html.includes('id="beranda"') },
  { name: 'Section #tentang', ok: html.includes('id="tentang"') },
  { name: 'Section #menu', ok: html.includes('id="menu"') },
  { name: 'Section #testimoni', ok: html.includes('id="testimoni"') },
  { name: 'Section #kontak', ok: html.includes('id="kontak"') },
  { name: 'Mobile Menu ID', ok: html.includes('id="mobile-menu"') },
  { name: 'Filter Button Attributes', ok: html.includes('data-filter=') },
];

console.table(checks);

// Check all image sources exist on disk
const imgMatches = html.match(/src="(\/[^"]+)"/g) || [];
let missingImages = 0;
imgMatches.forEach(tag => {
  const src = tag.replace('src="', '').replace('"', '');
  const localFile = 'dist' + src;
  if (!fs.existsSync(localFile)) {
    console.error('Missing image file:', localFile);
    missingImages++;
  }
});

if (missingImages === 0) {
  console.log(`✅ All ${imgMatches.length} referenced images exist in dist/`);
} else {
  console.error(`❌ ${missingImages} images missing!`);
  process.exit(1);
}

const allOk = checks.every(c => c.ok);
if (allOk) {
  console.log('✅ ALL VERIFICATIONS PASSED PERFECTLY!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
