/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#107C41', // Excel Green
        'primary-dark': '#0E6B36', // Darker Excel Green
        'primary-light': '#139650', // Lighter Excel Green
        gold: '#D4AF37', // Gold accent
        'gold-light': '#E6C54A', // Lighter gold
        'gold-dark': '#B8941F' // Darker gold
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
