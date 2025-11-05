module.exports = {
  // Correct content globs for CRA: scan src and public
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        background: '#f5f5f7',
        foreground: '#000000',
        muted: '#86868b',
        line: '#d2d2d7',
        card: '#ffffff',
        accent: '#007aff',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '14px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
