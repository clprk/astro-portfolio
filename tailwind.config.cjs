module.exports = {
    content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        keyframes: {
          'fade-out': {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          },
        },
        animation: {
          'fade-out': 'fade-out 0.5s ease forwards',
        },
      },
    },
    plugins: [],
  };