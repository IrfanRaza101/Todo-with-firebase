/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      colors: {
        'primary': '#4f46e5',
        'secondary': '#6366f1',
        'bg': {
          'background': '#f3f4f6',
          'surface': '#ffffff'
        },
        'text': {
          'primary': '#111827',
          'secondary': '#4b5563'
        }
      },
      boxShadow: {
        'custom': '0 2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
}
