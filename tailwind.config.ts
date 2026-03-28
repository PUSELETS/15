import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontSize: {
				// small / UI
				'fib-12': 'clamp(11px,0.8vw+8px,13px)',
				'fib-14': 'clamp(12px, 0.9vw + 9px, 15px)',
				'fib-16': 'clamp(14px, 1.0vw + 10px, 17px)',
				'fib-19': 'clamp(16px, 1.2vw + 11px, 20px)', // buttons
				'fib-22': 'clamp(18px, 1.4vw + 13px, 24px)',
				'fib-26': 'clamp(22px, 1.7vw + 15px, 28px)', // mobile product name
				// mid sizes
				'fib-30': 'clamp(26px, 2.0vw + 18px, 32px)',
				'fib-35': 'clamp(30px, 2.4vw + 21px, 38px)',
				'fib-41': 'clamp(35px, 2.8vw + 25px, 45px)',
				// headings / hero
				'fib-48': 'clamp(40px, 3.5vw + 28px, 52px)',
				'fib-56': 'clamp(46px, 4.2vw + 32px, 60px)',
				'fib-65': 'clamp(54px, 5.0vw + 38px, 70px)',
				'fib-76': 'clamp(62px, 6.0vw + 44px, 82px)',
				'fib-89': 'clamp(72px, 7.2vw + 50px, 96px)', // ≈96px max
				'fib-104': 'clamp(80px, 8.5vw + 55px, 110px)', // slightly over if needed
			},
		},
	},

	plugins: [require("tailwindcss-animate")],
};
export default config;
