/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#2B9B47',
				secondary: '#BCE2B1',
				opposite: '#EA7F68'
			}
		}
	},
	plugins: []
};
