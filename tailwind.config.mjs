/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#B91F24',
          deep: '#861C20',
          cream: '#FFF9F0',
          gold: '#F4B942',
          forest: '#1B4D3E',
          dark: '#211D1B',
          muted: '#746B64',
          border: '#EFE7DA',
          surface: '#FAF4EB',
        }
      },
      backgroundImage: {
        'complementary-warm': 'linear-gradient(180deg, #FFF9F0 0%, #FCF3E5 100%)',
        'complementary-cta': 'linear-gradient(135deg, #B91F24 0%, #941B1F 50%, #861C20 100%)',
        'complementary-accent': 'linear-gradient(135deg, #F4B942 0%, #D97706 100%)',
        'complementary-card': 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F2 100%)',
        'complementary-border': 'linear-gradient(135deg, #B91F24 0%, #F4B942 50%, #1B4D3E 100%)',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        editorial: '0 4px 20px -2px rgba(33, 29, 27, 0.06)',
        hoverCard: '0 12px 28px -4px rgba(134, 28, 32, 0.1), 0 4px 12px -2px rgba(33, 29, 27, 0.05)',
      },
      borderRadius: {
        'card': '16px',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
};
