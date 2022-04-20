module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4/3',
      },
      colors: {
        princ: '#D9958F',
        sec: '#F2B4AE',
      },
    },
  },
  plugins: [],
}
