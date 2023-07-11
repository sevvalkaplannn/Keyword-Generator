/* @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        screens: {
            'sm': '576px', 
            'md': '768px',
            'lg': '992px',          
            'xl': '1200px',
          },
    },
    plugins: [],
};