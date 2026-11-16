process.env.ASTRO_TELEMETRY_DISABLED = '1';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const siteUrl = process.env.URL || 'https://pecellelearrahman.netlify.app';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
  site: siteUrl,
});
