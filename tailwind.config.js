/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: '#2B9B47',
                secondary: '#BCE2B1',
                opposite: '#EA7F68',
                gray: {
                    100: '#D9D9D9',
                },
            },
            fontFamily: {
                regular: ["Inter", "sans-serif"],
                bold: ["Inter", "sans-serif"],
                semibold: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: []
};
