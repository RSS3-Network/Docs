import { createPreset } from "fumadocs-ui/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./content/**/*.{md,mdx}",
		"./node_modules/fumadocs-ui/dist/**/*.js",
		"./node_modules/fumadocs-openapi/dist/**/*.js",
	],
	presets: [createPreset({ preset: "ocean" })],
};
