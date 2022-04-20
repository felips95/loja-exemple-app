module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/1': '4/1',
      },
      colors: {
        princ: '#D9958F',
        sec: '#F2B4AE',
      },
    },
  },
  plugins: [],
}
