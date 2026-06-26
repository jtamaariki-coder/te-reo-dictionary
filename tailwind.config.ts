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
        // Primary green — deep forest, desaturated
        forest: {
          50:  '#EBF2EC',
          100: '#D6E5D8',
          200: '#ADCBB2',
          300: '#83B18B',
          400: '#5A9768',
          500: '#3A7A48',
          600: '#1C3D2E',
          700: '#163028',
          800: '#102322',
          900: '#0A1619',
          950: '#0F2318',
        },
        // Pine — alias for primary accent, same values as forest
        pine: {
          50:  '#EBF2EC',
          100: '#D6E5D8',
          200: '#ADCBB2',
          300: '#83B18B',
          400: '#5A9768',
          500: '#3A7A48',
          600: '#1C3D2E',
          700: '#163028',
          800: '#102322',
          900: '#0A1619',
          950: '#0F2318',
        },
        // Terracotta / amber — secondary accent
        terracotta: {
          50:  '#FDF4EC',
          100: '#FAEADB',
          200: '#F5D5B7',
          300: '#EFBF93',
          400: '#DAAA6F',
          500: '#C4763A',
          600: '#A5622F',
          700: '#864E25',
          800: '#673A1B',
          900: '#482611',
        },
        // Warm cream — backgrounds and surfaces
        cream: {
          50:  '#FDFAF5',
          100: '#F5F0E8',
          200: '#EDE8DF',
          300: '#E8E2D6',
          400: '#D5CFC3',
          500: '#B8B2A6',
        },
        // Warm stone — text secondary and borders
        earth: {
          50:  '#FDFAF5',
          100: '#EDE8DF',
          200: '#E8E2D6',
          300: '#D5CFC3',
          400: '#A8A29A',
          500: '#6B6B5F',
          600: '#52524A',
          700: '#3D3D37',
          800: '#28281F',
          900: '#1A1A14',
          950: '#0D0D0A',
        },
        // Ocean blue-green (moana) — kept for structure tab colour coding
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
    },
  },
  plugins: [],
}

export default config
