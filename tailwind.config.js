/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"white": "#fff",
				"bg-gray": "#F7F8FA",
				"dark-gray": "#687588",
				"brand-blue": "#1456F5",
				"light-blue": "#EBF1FE",
				"red": "#ED544E",
				"light-red": "#F6E8E9",
				"yellow": "#F4C700",
				"light-yellow": "#F7F3E1",
				"green": "#66C87B",
				"light-green": "#E8F3ED",
				"black": "#161616",
				"secondary-black": "#1E1E1E",
				"transparent": "transparent",
			  },
		},
	},
	plugins: [],
};
