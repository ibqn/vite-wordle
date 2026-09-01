/** @type {import('prettier').Config} */
export default {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/index.css',
}
