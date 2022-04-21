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
        princ: '#F29985',
        sec: '#F2C1AE',
      },
    },
  },
  plugins: [],
}
