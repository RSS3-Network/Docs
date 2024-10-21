import { source } from "@/app/source";
import { Card } from "fumadocs-ui/components/card";

/**
 * A card that links to a page.
 *
 * The id could be defined in the frontmatter of the page.
 *
 * For example:
 *
 * ```mdx
 * ---
 * id: core
 * title: ...
 * ---
 * ```
 *
 * Then to link to this page:
 *
 * ```mdx
 * Here is the page:
 *
 * <LinkCard id="core" />
 * ```
 *
 * Or simply write the path of the page: `/guide/core`.
 *
 * ```mdx
 * Here is the page:
 *
 * <LinkCard id="/guide/core" />
 * ```
 */
export function LinkCard({
	id,
}: {
	id: string;
}) {
	const pages = source.getPages();

	let page = pages.find((page) => page?.data.id === id);
	if (!page) {
		page = pages.find((page) => page?.url === id);
	}

	if (!page) {
		return (
			<Card
				title="Page not found"
				description={`The page you are looking for does not exist. (id: ${id})`}
			/>
		);
	}

	const title = page.data.title;
	const description = page.data.description;
	const link = page.url;

	return <Card title={title} description={description} href={link} />;
}
