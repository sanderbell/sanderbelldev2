/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ['Oxygen', 'sans-serif'],
        mono: [
          "'SF Mono'",
          "'SFMono-Regular'",
          'ui-monospace',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      colors: {
        lp: {
          bg: '#000000',
          border: 'rgba(255,255,255,0.08)',
        },
      },
    },
  },
  plugins: [],
}
