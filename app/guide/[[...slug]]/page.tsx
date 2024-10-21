import { openapi, source } from "@/app/source";
import { LinkCard } from "@/components/ui/link-card/link-card";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { getImageMeta } from "fumadocs-ui/og";
import {
	DocsBody,
	DocsCategory,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: { slug?: string[] };
}) {
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDX = page.data.body;

	return (
		<DocsPage
			toc={page.data.toc}
			lastUpdate={page.data.lastModified}
			full={page.data.full}
			editOnGithub={{
				repo: "docs",
				owner: "rss3-network",
				path: `content/guide/${page.file.path}`,
			}}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDX
					components={{
						...defaultMdxComponents,
						APIPage: openapi.APIPage,
						LinkCard: LinkCard,
					}}
				/>
			</DocsBody>
			{page.data.index ? (
				<DocsCategory page={page} pages={source.getPages()} />
			) : null}
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const image = getImageMeta("og", page.slugs);

	return {
		title: page.data.title,
		description: page.data.description,
		openGraph: {
			images: image,
		},
		twitter: {
			images: image,
			card: "summary_large_image",
		},
	} satisfies Metadata;
}
