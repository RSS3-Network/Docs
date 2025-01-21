import fs from "node:fs";
import { generateFiles } from "fumadocs-openapi";

// remove this dir before running the script
fs.rmSync("./content/guide/ai/agent-data/api", {
	recursive: true,
	force: true,
});

await generateFiles({
	input: ["https://ai.rss3.io/openapi.json"],
	output: "./content/guide/ai/agent-data/api",
	groupBy: "tag",
	per: "operation",
});

await generateFiles({
	input: ["https://ai.rss3.io/openapi.json"],
	output: "./content/guide/ai/agent-data/api",
	groupBy: "tag",
	per: "file",
});

// add necessary frontmatter to the file:
// prepend `id: agent-data-api` and `icon: Openapi` to the file's frontmatter
const content = fs.readFileSync(
	"./content/guide/ai/agent-data/api/index.mdx",
	"utf-8",
);
fs.writeFileSync(
	"./content/guide/ai/agent-data/api/index.mdx",
	`---
id: agent-data-api
icon: Openapi${content.replace("---", "")}`,
);
