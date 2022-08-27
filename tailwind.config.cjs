/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/factories/**/*.{js,ts,jsx,tsx}',
    './src/presentation/**/*.{js,ts,jsx,tsx}',
    './src/shared/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
      colors: {
        green: {
          50: '#ebfaf6',
          100: '#c3efe3',
          200: '#9ae4d1',
          300: '#72dabe',
          400: '#4acfac',
          500: '#30b592',
          600: '#258d72',
          700: '#1b6551',
          800: '#103c31',
          900: '#051410',
        },
        orange: {
          50: '#fff2e5',
          100: '#ffd9b3',
          200: '#ffbf80',
          300: '#ffa64d',
          400: '#ff8c1a',
          500: '#e67300',
          600: '#b35900',
          700: '#804000',
          800: '#4d2600',
          900: '#1a0d00',
        },
        purple: {
          50: '#eaedfa',
          100: '#c1c8f0',
          200: '#98a3e6',
          300: '#6f7fdc',
          400: '#465ad3',
          500: '#2c41b9',
          600: '#233290',
          700: '#192467',
          800: '#0f163e',
          900: '#050715',
        },
        cian: {
          50: '#eaf9fa',
          100: '#c1eef0',
          200: '#98e2e7',
          300: '#6ed7dd',
          400: '#45cbd3',
          500: '#2cb2ba',
          600: '#228a91',
          700: '#186367',
          800: '#0f3b3e',
          900: '#051415',
        },
        salmon: {
          50: '#ffeae5',
          100: '#ffc1b3',
          200: '#ff9880',
          300: '#ff6f4d',
          400: '#ff461a',
          500: '#e62d00',
          600: '#b32300',
          700: '#801900',
          800: '#4d0f00',
          900: '#1a0500',
        },
        red: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        },
        zinc: {
          1000: '#121212',
        },
      },
      borderRadius: {
        md: '4px',
      },
      fontFamily: {
        inter: ['Inter'],
        lexend: ['Lexend'],
        poppins: ['Poppins'],
        openSans: ['Open Sans'],
      },
      gridTemplateAreas: {
        presentationHome: ['main firstAside', 'main secondAside'],
      },
      gridTemplateColumns: {
        presentationHome: '3fr 2fr',
      },
      gridTemplateRows: {
        presentationHome: '1fr 1fr',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('@savvywombat/tailwindcss-grid-areas'),
  ],
};
