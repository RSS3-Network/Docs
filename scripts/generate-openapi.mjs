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
	input: ["https://agent.open.network/openapi.json"],
	output: "./content/guide/ai/openagent",
	groupBy: "tag",
	per: "operation",
});

// rename the ./content/guide/ai/openagent/completion folder to ./content/guide/ai/openagent/completion-API
// remove this dir before running the script
fs.rmSync("./content/guide/ai/openagent/completion-API", { recursive: true, force: true });
fs.renameSync(
	"./content/guide/ai/openagent/completion",
	"./content/guide/ai/openagent/completion-API",
);

await generateFiles({
	input: ["https://gi.rss3.io/docs/openapi.json"],
	output: "./content/guide/developer/api",
	groupBy: "tag",
	per: "file",
});

// add necessary frontmatter to the file:
// prepend `id: api` and `icon: Openapi` to the file's frontmatter
const content = fs.readFileSync(
	"./content/guide/developer/api/index.mdx",
	"utf-8",
);
fs.writeFileSync(
	"./content/guide/developer/api/index.mdx",
	`---
id: api
icon: Openapi${content.replace("---", "")}`,
);
