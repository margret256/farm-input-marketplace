/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2E7D32',
          light: '#66BB6A',
          dark: '#1B5E20',
        },
        accent: {
          orange: '#F57C00',
          yellow: '#FBC02D',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F5F5F5',
        },
        ink: {
          DEFAULT: '#212121',
          soft: '#424242',
          muted: '#9E9E9E',
        },
      },
      fontFamily: {
        heading: ['Poppins'],
        body: ['Inter'],
      },
      borderRadius: {
        card: '8px',
      },
      boxShadow: {
        soft: '0 4px 16px rgba(33, 33, 33, 0.08)',
      },
    },
  },
  plugins: [],
};
