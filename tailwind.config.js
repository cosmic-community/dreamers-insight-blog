/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f4f6f7',
          100: '#e3e8ea',
          200: '#c6d1d5',
          300: '#9eb1b8',
          400: '#758f98',
          500: '#58737d',
          600: '#465d66',
          700: '#3a4c54',
          800: '#334147',
          900: '#11171A', // Cosmic dark
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}