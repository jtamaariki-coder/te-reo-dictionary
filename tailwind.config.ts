import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Forest greens
        forest: {
          50:  '#f0f7f0',
          100: '#dceddc',
          200: '#bbdcbb',
          300: '#8fc38f',
          400: '#5fa45f',
          500: '#3d883d',
          600: '#2d6b2d',
          700: '#245424',
          800: '#1e431e',
          900: '#193819',
          950: '#0c1f0c',
        },
        // Earth tones
        earth: {
          50:  '#faf6f1',
          100: '#f2e9de',
          200: '#e4d0bb',
          300: '#d3b190',
          400: '#bf8f65',
          500: '#b07447',
          600: '#9a5f3b',
          700: '#7f4b31',
          800: '#683e2c',
          900: '#573428',
          950: '#2f1a13',
        },
        // Warm off-white
        cream: {
          50:  '#fdfcf8',
          100: '#faf7f0',
          200: '#f4eddb',
          300: '#ecdfc0',
          400: '#e2cc9a',
          500: '#d6b872',
        },
        // Ocean blue-green (moana)
        moana: {
          50:  '#f0f9fa',
          100: '#d9f0f3',
          200: '#b7e2e8',
          300: '#85cdd7',
          400: '#4bafc0',
          500: '#3093a6',
          600: '#29758c',
          700: '#255f72',
          800: '#234f5e',
          900: '#204350',
          950: '#0f2b36',
        },
      },
      fontFamily: {
        display: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
