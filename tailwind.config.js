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
      'light-gray': "#fefefe",
      'middle-gray': '#eeeeee',
      'dark-gray': "#777777",
      'palette-gray': '#dddddd',
    },
    extend: {
      keyframes: {
        rotate: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(360deg)' },
        },
        svgStrokeGlowRed: {
          '0%': { stroke: '#ff0000' }, // Starting color
          '10%': { stroke: '#ff0000' }, // Starting color
          '50%': { stroke: '#000000' }, // Midpoint color
          '90%': { stroke: '#ff0000' }, // Ending color
          '100%': { stroke: '#ff0000' }, // Ending color
        },
        svgStrokeBlink: {
          '0%': { stroke: '#3d3d3d' },
          '50%': { stroke: 'transparent' },
          '100%': { stroke: '#3d3d3d' },
        },
        dashdraw: {
          '0%': { 'stroke-dashoffset': '100' },
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        'svg-stroke-glow-red': 'svgStrokeGlowRed 2s linear infinite',
        'svg-stroke-blink': 'svgStrokeBlink 1s infinite',
        'dashdraw': 'dashdraw 0.5s linear infinite',
      },
      backgroundImage: {
        "striped": "url('/diagonal-stripes.svg')",
      },
    }
  },
  plugins: [],
}