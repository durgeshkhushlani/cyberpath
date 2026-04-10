/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A1628',
        surface: '#111F38',
        'surface-2': '#1A2F52',
        border: '#1E3A5F',
        accent: '#2563EB',
        'accent-hover': '#1D4ED8',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        'progress-bar': '#2563EB',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
