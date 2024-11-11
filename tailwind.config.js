/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#185fab',
        secondaryColor: '#f8da5a',
      },
      backgroundImage: {
        welcomePage:
          "url('https://d2nahbmqd5vvug.cloudfront.net/appdata/Welcome+screen+desktop+1.png')",
      },
    },
  },
  plugins: [],
};
