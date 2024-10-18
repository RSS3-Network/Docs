import fs from "node:fs";
import { generateFiles } from "fumadocs-openapi";

// remove this dir before running the script
fs.rmSync("./content/guide/developer/api", { recursive: true, force: true });

await generateFiles({
	input: ["https://gi.rss3.io/docs/openapi.json"],
	output: "./content/guide/developer/api",
	groupBy: "tag",
	per: "operation",
});

await generateFiles({
	input: ["https://gi.rss3.io/docs/openapi.json"],
	output: "./content/guide/developer/api",
	groupBy: "tag",
	per: "file",
});

// add icon to the file:
// @case-police-ignore Openapi
// prepend `icon: Openapi` to the file's frontmatter
const content = fs.readFileSync(
	"./content/guide/developer/api/index.mdx",
	"utf-8",
);
fs.writeFileSync(
	"./content/guide/developer/api/index.mdx",
	`---
icon: Openapi # @case-police-ignore Openapi${content.replace("---", "")}`,
);
