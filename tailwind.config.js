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
        princ: '#DC8B95',
      },
      fontFamily: {
        display: ['Marcellus SC', 'serif'],
        body: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
