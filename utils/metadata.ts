import type { Metadata } from "next";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: "https://docs.rss3.io",
			images: "/banner.png",
			siteName: "RSS3 Docs",
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@rss3_",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: "/banner.png",
			...override.twitter,
		},
	};
}

export const baseUrl =
	process.env.NODE_ENV === "development" || !process.env.VERCEL_URL
		? new URL("http://localhost:3000")
		: process.env.NODE_ENV === "production"
			? new URL("https://docs.rss3.io")
			: new URL(`https://${process.env.VERCEL_URL}`);
