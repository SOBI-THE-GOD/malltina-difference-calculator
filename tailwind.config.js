/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{jsx, js}"],
	theme: {
		extend: {
			keyframes: {
				showup: {
					"0%": {
						opacity: "0",
						scale: "0.9",
					},
					"100%": {
						opacity: "1",
						scale: "1",
					},
				},
				disapear: {
					"0%": { opacity: "1", transform: "translate(-50%, 0)" },
					"100%": {
						opacity: "0",
						transform: "translate(-50%, 0.25rem)",
					},
				},
				scaleUp: {
					"0%": { scale: "0.98", opacity: "0" },
					"100%": { scale: "1.0", opacity: "1" },
				},
				scaleBounce: {
					"0%": { scale: "1" },
					"50%": { scale: "0.4" },
					"100%": { scale: "1" },
				},
			},
			animation: {
				showup: "showup 0.45s ease forwards",
				disapear: "disapear 0.45s ease",
				scaleUp: "scaleUp 0.25s ease",
				scaleBounce: "scaleBounce 1.2s ease var(--delay) infinite",
			},
			colors: {
				primary: "#000000",
				secondary: "#ffffff",
				tertiary: "#6d28d9",
				quaternary: "#404040",
			},
		},
	},
	plugins: [],
};
