/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';
export default {
  content: ['index.html', './src/**/*.{tsx, ts, js}'],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarHide
    // ...
  ],
}

