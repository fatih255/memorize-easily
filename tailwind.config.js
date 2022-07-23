module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'collision-x': 'collisionX 1s ease-in-out forwards',
      },
      keyframes: {
        collisionX: {
          '0%': { transform: 'translateX(0%)' },
          '30%': { transform: 'translateX(-40%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}