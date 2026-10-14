export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-rtl': 'marquee-rtl 30s linear infinite',
        heartbeat: "heartbeat 1.5s ease-in-out infinite",

      },
      
    
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%":       { transform: "scale(1.1)" },
          "28%":       { transform: "scale(1)" },
          "42%":       { transform: "scale(1.08)" },
          "70%":       { transform: "scale(1)" },
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(-50%)' },  // starts off-screen left
          '100%': { transform: 'translateX(0%)' },     // ends at natural position
        },
      },
      colors: {
        primary: {
          950: '#3673B6',
          900: '#105AB4',
          500: '#3b82f6',
          400: '#60a5fa',
          300: '#93c5fd',
          100: '#bfdbfe',
          600: '#2563eb',
          200: '#a5b4fc',
          700: '#1d4ed8',
          800: '#3673B6',
        },
        accent: {
          50: '#fff7ed',
          500: '#f59e0b',
          600: '#d97706',
          400: '#fbbf24',
          300: '#fcd34d',
          200: '#fde68a',
          100: '#fef3c7',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
