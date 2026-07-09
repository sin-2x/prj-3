export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#050507',
        pearl: '#f8f2e8',
        champagne: '#d6b774',
        rose: '#c16c73',
        dusk: '#10121a',
        rain: '#6f8395',
      },
      boxShadow: {
        glow: '0 0 70px rgba(214, 183, 116, 0.2)',
        glass: '0 24px 90px rgba(0, 0, 0, 0.35)',
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};
