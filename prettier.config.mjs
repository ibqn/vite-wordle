/** @type {import('prettier').Config} */
export default {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-tailwindcss'],
  // Tailwind v4 keeps the theme in CSS, so the class sorter needs the entry point.
  tailwindStylesheet: './src/index.css',
}
