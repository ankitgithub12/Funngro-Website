/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Funngro mint-green accent
          green: {
            light: '#5ef5b0',
            DEFAULT: '#2DDE98',
            dark: '#10B981',
            deep: '#059669',
            glow: 'rgba(45,222,152,0.15)',
          },
          // Dark forest-green backgrounds
          dark: {
            bg: '#0B1A14',
            card: '#112218',
            surface: '#162C20',
            border: 'rgba(255,255,255,0.08)',
            text: '#f3f4f6',
            muted: '#9CA3AF',
          },
          // Legacy purple (kept for existing components)
          purple: {
            light: '#a78bfa',
            DEFAULT: '#8b5cf6',
            dark: '#6d28d9',
          },
          gold: {
            DEFAULT: '#f59e0b',
          }
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'ticker-scroll': 'tickerScroll 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tickerScroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(45,222,152,0.25)',
        'glow-green-sm': '0 0 12px rgba(45,222,152,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
