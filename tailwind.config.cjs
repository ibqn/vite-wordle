/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        shake: 'shake 600ms',
        bounce: 'bounce 1s',
        popin: 'popin 100ms',
      },
      keyframes: {
        bounce: {
          '0%, 20%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-30px)',
          },
          '50%': {
            transform: 'translateY(5px)',
          },
          '60%': {
            transform: 'translateY(-15px)',
          },
          '80%': {
            transform: 'translateY(2px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        shake: {
          '10%, 90%': {
            transform: 'translateX(-1px)',
          },
          '20%, 80%': {
            transform: 'translateX(2px)',
          },
          '30%, 50%, 70%': {
            transform: 'translateX(-4px)',
          },
          '40%, 60%': {
            transform: 'translateX(4px)',
          },
        },
        popin: {
          from: {
            transform: 'scale(0.8)',
            opacity: 0,
          },
          '40%': {
            transform: 'scale(1.1)',
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
}
