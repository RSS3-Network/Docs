import { baseUrl, createMetadata } from "@/utils/metadata";
import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { Viewport } from "next";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";

const font = Poppins({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export const metadata = createMetadata({
	title: {
		template: "%s | Fumadocs",
		default: "Fumadocs",
	},
	description: "The Next.js framework for building documentation sites",
	metadataBase: baseUrl,
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
		{ media: "(prefers-color-scheme: light)", color: "#fff" },
	],
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={font.className} suppressHydrationWarning>
			<body>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	);
}
