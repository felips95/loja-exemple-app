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
        princ: '#C9ADA7',
        sec: '#F2E9E4',
      },
    },
  },
  plugins: [],
}
