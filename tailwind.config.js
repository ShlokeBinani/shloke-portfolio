/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#050505',      // The Deep Black from the interface
        maroon: '#731A33',    // The main Royal Maroon background glow
        'glow-light': '#A63B5F', // The lighter maroon for text/lines
        white: '#ffffff'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}