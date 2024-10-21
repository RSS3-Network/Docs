import {
	defineConfig,
	defineDocs,
	frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export const { docs, meta } = defineDocs({
	docs: {
		dir: "content/guide",
		schema: frontmatterSchema.extend({
			id: z.string().optional(),
			index: z.boolean().optional(),
		}),
	},
	meta: {
		dir: "content/guide",
	},
});

export default defineConfig({
	mdxOptions: {},
});
