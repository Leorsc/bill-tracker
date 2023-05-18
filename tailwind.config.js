/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'light-greyish-white': '#F8F8F9',
        'lavander-grey': '#F0F0F5',
        'dark-green': '#0E8750',
        'pink': '#DA0175',
        'dark-slate-grey': '#3F3F55',
        'paid': '#EEF7F7',
        'overdue': '#FFEFEF',
        'pending': '#FCF6DC',
        'paid-text': '#1FA7AF',
        'overdue-text': '#971D1D',
        'pending-text': '#C5A605',
        'morning-breeze': '#EFF0F7',
        'deep-night': '#343447',
        'light-greyish': '#DEDEE9',
        'error-message': '#E70000',
        'label-form': '#344054',
        'input-form': '#667085',
        'border-input': '#D0D5DD',
        'login': '#034a2a0d',
        'graphite': '#747488',
        'modal': '#919a964d',
        'span-table': '#6E6E85',
        'line-table': '#EFF0F6',
        'red-2': '#AE1100'
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ['Inter', 'sans-serif']
      },
      height: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem'
      },
      width: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '192': '48rem'
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '1.875rem',
        'ten': '0.625rem'
      },
      dropShadow: {
        'modal': '0 4px 4px rgba(0, 0, 0, 0.2)',
        'home-tables': '0px 4px 4px rgba(172, 217, 197, 0.25)',
        'input-searc': '0px 5px 10px rgba(218, 1, 117, 0.1)',
      },
      boxShadow: {
        'notify-window': '0px 4px 42px rgba(0, 0, 0, 0.2)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'slide-in': {
          'from': { transform: 'translateX(100%)', opacity: 0 },
          'to': { transform: 'translateX(0)', opacity: 1 }
        },
        'slide-out': {
          'from': { transform: 'translateX(0)', opacity: 1 },
          'to': { transform: 'translateX(100%)', opacity: 0 }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-in': 'slide-in 0.9s ease-out forwards',
        'slide-out': 'slide-out 0.9s ease-out forwards'
      }
    },
  },
  plugins: [],
}

