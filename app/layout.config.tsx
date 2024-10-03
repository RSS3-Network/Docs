import { RootToggle } from "fumadocs-ui/components/layout/root-toggle";
import type { HomeLayoutProps } from "fumadocs-ui/home-layout";
import type { DocsLayoutProps } from "fumadocs-ui/layout";
import { source } from "./source";

export interface Mode {
	param: string;
	name: string;
	description: string;
}

export const modes: Mode[] = [
	{
		param: "core",
		name: "Core",
		description: "The core concepts",
	},
	{
		param: "developer",
		name: "Developer",
		description: "The buidl guide",
	},
	{
		param: "ai",
		name: "AI",
		description: "The AI",
	},
];

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: HomeLayoutProps = {
	nav: {
		title: "RSS3 Docs",
	},
	links: [
		{
			text: "Guide",
			url: "/guide/core",
			active: "nested-url",
		},
	],
	githubUrl: "https://github.com/rss3-network/docs",
};

export const guideOptions: DocsLayoutProps = {
	...baseOptions,
	tree: source.pageTree,
	sidebar: {
		banner: (
			<RootToggle
				options={modes.map((mode) => ({
					url: `/guide/${mode.param}`,
					title: mode.name,
					description: mode.description,
				}))}
			/>
		),
	},
};
