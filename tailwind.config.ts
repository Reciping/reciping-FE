import type { Config } from 'tailwindcss'

const config: Partial<Config> = {
  content: ['src/**/*.{ts,tsx}', './index.html'],
  theme: {
    colors: {
      brand: {
        50:  '#FFF0EC',
        300: '#F2895C',
        500: '#E85C28',
        700: '#9F2C0B',
      },
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['"Pretendard"', 'system-ui', '-apple-system', 'Roboto', 'sans-serif'],
    },
    borderRadius: {
      DEFAULT: '1.5rem',
      lg: '1.5rem',
      xl: '2rem',
      full: '9999px',
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
