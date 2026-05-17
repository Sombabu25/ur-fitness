/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#FF2D55',
          purple: '#7B2FFF',
          dark: '#0A0A0F',
          card: '#111118',
          border: '#1E1E2E',
          muted: '#2A2A3E',
          text: '#E8E8F0',
          sub: '#8888AA',
        }
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'sans-serif'],
        body: ['var(--font-rajdhani)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% 0%, rgba(123,47,255,0.3) 0%, transparent 70%)',
        'red-glow': 'radial-gradient(ellipse at 50% 50%, rgba(255,45,85,0.2) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(123,47,255,0.3)' },
          to: { boxShadow: '0 0 40px rgba(123,47,255,0.6), 0 0 80px rgba(255,45,85,0.2)' },
        }
      }
    },
  },
  plugins: [],
};
