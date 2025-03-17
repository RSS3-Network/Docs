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

// add necessary frontmatter to the file:
// prepend `id: api` and `icon: Openapi` to the file's frontmatter
const content = fs.readFileSync(
	"./content/guide/developer/api/index.mdx",
	"utf-8",
);
fs.writeFileSync(
	"./content/guide/developer/api/index.mdx",
	`---
id: dsl-openapi
icon: Openapi${content.replace("---", "")}`,
);

// modify the directory name to be more readable
const apiDir = "./content/guide/developer/api";
const dirs = fs.readdirSync(apiDir, { withFileTypes: true });
for (const dir of dirs) {
	if (dir.isDirectory()) {
		const oldName = dir.name;
		// Check if directory name consists of single letters separated by dashes
		const isSingleLetters = oldName
			.split("-")
			.every((part) => part.length === 1);

		if (isSingleLetters) {
			// Remove dashes between single letters
			const newName = oldName.replace(/-/g, "");
			fs.renameSync(`${apiDir}/${oldName}`, `${apiDir}/${newName}`);
			console.log(`Renamed directory: ${oldName} -> ${newName}`);
		}
	}
}
