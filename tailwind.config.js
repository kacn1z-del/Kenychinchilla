/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#0071E3',
          'blue-light': '#2997FF',
          green: '#30D158',
          purple: '#BF5AF2',
          red: '#FF375F',
          yellow: '#FFD60A',
        },
        apple: {
          bg: '#F5F5F7',
          card: '#FFFFFF',
          text: '#1D1D1F',
          muted: '#86868B',
          border: '#D2D2D7',
          dark: '#000000',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'scroll': 'scroll 20s linear infinite',
        'pulse-dot': 'pulseDot 2s ease infinite',
        'blink': 'blink 1.2s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.3)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
