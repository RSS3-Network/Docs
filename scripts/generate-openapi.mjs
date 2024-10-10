import fs from "node:fs";
import { generateFiles } from "fumadocs-openapi";

// remove this dir before running the script
fs.rmSync("./content/guide/developer/api", { recursive: true, force: true });

void generateFiles({
	input: ["https://gi.rss3.io/docs/openapi.json"],
	output: "./content/guide/developer/api",
	groupBy: "tag",
	per: "operation",
});

void generateFiles({
	input: ["https://gi.rss3.io/docs/openapi.json"],
	output: "./content/guide/developer/api",
	groupBy: "tag",
	per: "file",
});
