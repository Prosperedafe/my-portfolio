/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0B',
          800: '#111113',
          700: '#18181B',
          600: '#232327',
        },
        bone: '#EDE8DF',
        mute: '#8F8B83',
        accent: {
          DEFAULT: '#C8F542',
          deep: '#A9D61F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
        section: 'clamp(5rem, 12vw, 11rem)',
      },
      borderColor: {
        line: 'rgba(237, 232, 223, 0.12)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}
