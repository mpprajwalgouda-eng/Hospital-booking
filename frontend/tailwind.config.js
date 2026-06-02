export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B1120',
        card: '#111827',
        primary: '#3B82F6',
        secondary: '#06B6D4',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        text: '#F9FAFB',
        muted: '#9CA3AF',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(59, 130, 246, 0.18)',
      },
    },
  },
  plugins: [],
};
