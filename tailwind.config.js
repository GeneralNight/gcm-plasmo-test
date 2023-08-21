/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        'blue-primary': "#092E56",
        'blue-700': "#041324",
        'gray-100': "#8F92A1",
        'gray-50': "#E6EAEE",
        'red-error': "#D62242",
      },
    }
  }
}