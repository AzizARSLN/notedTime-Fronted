/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Notedtime renk paleti
        financial: {
          DEFAULT: '#8B5CF6', // mor
          light: '#A78BFA',
          dark: '#7C3AED'
        },
        reminder: {
          DEFAULT: '#3B82F6', // mavi
          light: '#60A5FA',
          dark: '#2563EB'
        },
        note: {
          DEFAULT: '#F59E0B', // sarı
          light: '#FBBF24',
          dark: '#D97706'
        },
        travel: {
          DEFAULT: '#10B981', // yeşil
          light: '#34D399',
          dark: '#059669'
        },
        counter: {
          DEFAULT: '#6B7280', // gri
          light: '#9CA3AF',
          dark: '#4B5563'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
