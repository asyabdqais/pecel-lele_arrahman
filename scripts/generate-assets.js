import sharp from 'sharp';
import fs from 'fs';

const items = [
  {
    file: 'ayam-goreng.jpg',
    title: 'Ayam Goreng Lengkuas',
    sub: 'Bumbu Kuning Rempah Gurih',
    tag: 'Menu Utama',
    bg1: '#78350F', bg2: '#B45309',
    emoji: '🍗'
  },
  {
    file: 'tahu-tempe.jpg',
    title: 'Tahu & Tempe Goreng',
    sub: 'Renyah Gurih Bumbu Ketumbar',
    tag: 'Menu Pelengkap',
    bg1: '#854D0E', bg2: '#CA8A04',
    emoji: '🧈'
  },
  {
    file: 'ati-ampela.jpg',
    title: 'Ati Ampela Goreng',
    sub: 'Sate Rempah Khas Tenda',
    tag: 'Menu Pelengkap',
    bg1: '#701A75', bg2: '#A21CAF',
    emoji: '🍢'
  },
  {
    file: 'kol-goreng.jpg',
    title: 'Kol Goreng Crispy',
    sub: 'Gurih Manis Renyah Gurih',
    tag: 'Menu Pelengkap',
    bg1: '#14532D', bg2: '#16A34A',
    emoji: '🥬'
  },
  {
    file: 'es-teh.jpg',
    title: 'Es Teh Manis',
    sub: 'Aroma Melati Segar Dingin',
    tag: 'Minuman Segar',
    bg1: '#9A3412', bg2: '#EA580C',
    emoji: '🧊'
  },
  {
    file: 'es-jeruk.jpg',
    title: 'Es Jeruk Peras',
    sub: 'Perasan Murni Kaya Vitamin C',
    tag: 'Minuman Segar',
    bg1: '#C2410C', bg2: '#F97316',
    emoji: '🍊'
  },
  {
    file: 'kopi.jpg',
    title: 'Kopi Hitam / Susu',
    sub: 'Seduhan Mantap Khas Warung',
    tag: 'Minuman Kopi',
    bg1: '#292524', bg2: '#57534E',
    emoji: '☕'
  }
];

async function createPlaceholders() {
  for (const item of items) {
    const svg = `
    <svg width="600" height="450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad-${item.file}" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${item.bg2}" />
          <stop offset="100%" stop-color="${item.bg1}" />
        </radialGradient>
      </defs>
      <rect width="600" height="450" fill="url(#grad-${item.file})" />
      <circle cx="300" cy="180" r="110" fill="white" fill-opacity="0.1" />
      <circle cx="300" cy="180" r="85" fill="white" fill-opacity="0.15" />
      <text x="300" y="205" font-size="80" text-anchor="middle" dominant-baseline="central">${item.emoji}</text>
      <rect x="180" y="300" width="240" height="32" rx="16" fill="white" fill-opacity="0.2" />
      <text x="300" y="322" font-family="sans-serif" font-weight="bold" font-size="14" fill="#FEF3C7" text-anchor="middle" letter-spacing="2">${item.tag.toUpperCase()}</text>
      <text x="300" y="370" font-family="sans-serif" font-weight="bold" font-size="24" fill="white" text-anchor="middle">${item.title.replace(/&/g, '&amp;')}</text>
      <text x="300" y="405" font-family="sans-serif" font-size="16" fill="#FDE68A" text-anchor="middle">${item.sub.replace(/&/g, '&amp;')}</text>
    </svg>
    `;
    await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile('public/images/menu/' + item.file);
    console.log('Created ' + item.file);
  }
}

createPlaceholders().then(() => console.log('All menu assets created!')).catch(console.error);
