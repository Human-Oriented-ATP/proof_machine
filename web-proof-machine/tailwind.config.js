/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'red': '#ff3838',
      'yellow': '#fff200',
      'green': '#32ff7e',
      'blue': '#7d5fff',
      'white': '#eeeeee',
      'black': '#3d3d3d',
      'orange': '#ff9f1a',
      'purple': '#c56cf0',
      'cyan': '#7efff5',
      'pink': '#ffcccc',
      'yellow-highlight': "#fffa65",
    },
    extend: {
    },
  },
  plugins: [],
}