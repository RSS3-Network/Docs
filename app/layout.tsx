import { baseUrl, createMetadata } from "@/utils/metadata";
import { RootProvider } from "fumadocs-ui/provider";
import type { Viewport } from "next";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const font = Poppins({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	variable: "--font-poppins",
});

export const metadata = createMetadata({
	title: {
		template: "%s | RSS3 Docs",
		default: "RSS3 Documentation",
	},
	description: "Everything you need to build with RSS3.",
	metadataBase: baseUrl,
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "##1477fb" },
		{ media: "(prefers-color-scheme: light)", color: "##1477fb" },
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
