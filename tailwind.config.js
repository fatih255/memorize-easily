module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideRightIn .7s ease-in-out forwards',
        'slide-out-right': 'slideRightOut .9s ease-in-out forwards',
        'fade-in': 'fadeIn .7s ease-in-out forwards',
        'fade-out': 'fadeOut .7s ease-in-out forwards'
      },
      keyframes: {
        slideRightIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { height: '100%', width: '100%', opacity: 1, transform: 'translateX(0%)' },

        },
        slideRightOut: {
          '0%': { opacity: 1, transform: 'translateX(0%)' },
          '50%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': { height: 0, width: 0, opacity: 0, transform: 'translateX(100%)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'translateX(0%)' },
          '100%': { opacity: 0, visibility: 'hidden', transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateX(100%)' },
          '100%': { opacity: 1, transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}