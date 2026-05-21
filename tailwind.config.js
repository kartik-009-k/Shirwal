/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: { cyan: '#22d3ee', purple: '#a855f7', pink: '#ec4899' }
      },
      boxShadow: {
        glass: '0 8px 32px rgba(34,211,238,0.2)',
      }
    }
  },
  plugins: [],
};
