import fs from "node:fs";
import { generateFiles } from "fumadocs-openapi";

const path = "./content/guide/developer/agentdata";

// remove this dir before running the script
fs.rmSync(path, {
	recursive: true,
	force: true,
});

await generateFiles({
	input: ["https://ai.rss3.io/openapi.json"],
	output: path,
	groupBy: "tag",
	per: "operation",
});

await generateFiles({
	input: ["https://ai.rss3.io/openapi.json"],
	output: path,
	groupBy: "tag",
	per: "file",
});

// add necessary frontmatter to the file:
// prepend `id: agent-data-api` and `icon: Openapi` to the file's frontmatter
const content = fs.readFileSync(`${path}/index.mdx`, "utf-8");
fs.writeFileSync(
	`${path}/index.mdx`,
	`---
id: agent-data-api
icon: Openapi${content.replace("---", "")}`,
);
