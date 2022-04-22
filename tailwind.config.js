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
        sec: '#ffc7da',
        princ: '#e3a3af',
      },
    },
  },
  plugins: [],
}
