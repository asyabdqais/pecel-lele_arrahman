import sharp from 'sharp';
import fs from 'fs';

async function applyImages() {
  console.log('Applying newly uploaded user images...');

  const base = 'public/images/menu/';

  // 1. Hero Pecel Lele from user's pecel-lele.jpg
  const pecelBuffer = fs.readFileSync(base + 'pecel-lele.jpg');
  await sharp(pecelBuffer)
    .resize(1000, 750, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92 })
    .toFile('public/images/hero-pecel-lele.jpg');
  console.log('Updated public/images/hero-pecel-lele.jpg');

  // 2. Ayam Penyet
  if (fs.existsSync(base + 'ayam penyet.jpg')) {
    const buf = fs.readFileSync(base + 'ayam penyet.jpg');
    await sharp(buf)
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92 })
      .toFile(base + 'ayam-penyet.jpg');
    console.log('Updated ayam-penyet.jpg');
  }

  // 3. Bebek Goreng
  if (fs.existsSync(base + '7 Bebek Goreng Paling Garing di Jakarta.jpg')) {
    const buf = fs.readFileSync(base + '7 Bebek Goreng Paling Garing di Jakarta.jpg');
    await sharp(buf)
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92 })
      .toFile(base + 'bebek-goreng.jpg');
    console.log('Updated bebek-goreng.jpg');
  }

  // 4. Ayam Goreng Bumbu Kuning
  if (fs.existsSync(base + 'ayam goreng basah purwakarta.jpg')) {
    const buf = fs.readFileSync(base + 'ayam goreng basah purwakarta.jpg');
    await sharp(buf)
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92 })
      .toFile(base + 'ayam-goreng.jpg');
    console.log('Updated ayam-goreng.jpg');
  }

  // 5. Tahu & Tempe Goreng
  if (fs.existsSync(base + 'Tahu Dan Tempe Bacem.jpg')) {
    const buf = fs.readFileSync(base + 'Tahu Dan Tempe Bacem.jpg');
    await sharp(buf)
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92 })
      .toFile(base + 'tahu-tempe.jpg');
    console.log('Updated tahu-tempe.jpg');
  }

  // 6. Ati Ampela Goreng
  if (fs.existsSync(base + 'ati ampela.jpg')) {
    const buf = fs.readFileSync(base + 'ati ampela.jpg');
    await sharp(buf)
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92 })
      .toFile(base + 'ati-ampela.jpg');
    console.log('Updated ati-ampela.jpg');
  }

  // 7. Kol Goreng Crispy
  if (fs.existsSync(base + 'kol goreng.jpg')) {
    const buf = fs.readFileSync(base + 'kol goreng.jpg');
    await sharp(buf)
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92 })
      .toFile(base + 'kol-goreng.jpg');
    console.log('Updated kol-goreng.jpg');
  }

  // Clean any stray temp file if exists
  if (fs.existsSync('temp_pecel_menu.jpg')) fs.unlinkSync('temp_pecel_menu.jpg');

  console.log('ALL USER IMAGES APPLIED CLEANLY AND OPTIMIZED!');
}

applyImages().catch(console.error);
