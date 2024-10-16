import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fetch from "node-fetch";

// API endpoints
const NETWORK_CONFIG_ENDPOINT =
	process.env.NETWORK_CONFIG_ENDPOINT || "https://gi.rss3.dev";

// Read worker.md and supported-networks.md files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.resolve(__dirname, "../content/guide/dsl/worker.md");
const supportedNetworksPath = path.resolve(
	__dirname,
	"../content/guide/dsl/supported-networks.mdx",
);
const workerContent = fs.readFileSync(workerPath, "utf8");
const supportedNetworksContent = fs.readFileSync(supportedNetworksPath, "utf8");

// Fetch network and worker data
const networkConfigResponse = await fetch(
	`${NETWORK_CONFIG_ENDPOINT}/nta/networks/config`,
);
const networkConfigData = (await networkConfigResponse.json()).data;

// Fetch network assets data
const networkAssetsResponse = await fetch(
	`${NETWORK_CONFIG_ENDPOINT}/nta/networks/assets`,
);
const networkAssetsData = (await networkAssetsResponse.json()).data;

// Extract networks and workers
const networks = [];
const workers = new Set();

for (const category of ["decentralized", "federated", "rss"]) {
	if (category === "rss") {
		networks.push(networkConfigData[category].id);
		workers.add(networkConfigData[category].worker_configs.worker.value);
	} else {
		for (const network of networkConfigData[category]) {
			const networkId = network.id === "mastodon" ? "activitypub" : network.id;
			networks.push(networkId);
			for (const workerConfig of network.worker_configs) {
				workers.add(workerConfig.worker.value);
			}
		}
	}
}

// Sort networks and workers
networks.sort();
let workersList = Array.from(workers).sort();

// Move "core" worker to the top if it exists
if (workersList.includes("core")) {
	workersList = ["core", ...workersList.filter((w) => w !== "core")];
}

// Initialize the table for worker.md
let workerTable = `| Network/Worker | ${networks.join(" | ")} |\n`;
workerTable += `| --- | ${networks.map(() => "---").join(" | ")} |\n`;

// Generate table rows for worker.md
const networkTotals = new Array(networks.length).fill(0);
for (const worker of workersList) {
	const displayName = worker === "core" ? `**${worker}**[1]` : worker;
	let row = `| ${displayName} |`;
	for (let i = 0; i < networks.length; i++) {
		const network = networks[i];
		let workerExists = false;
		for (const category of ["decentralized", "federated", "rss"]) {
			if (category === "rss") {
				if (
					network === networkConfigData[category].id &&
					networkConfigData[category].worker_configs.worker.value === worker
				) {
					workerExists = true;
					break;
				}
			} else if (
				networkConfigData[category].some(
					(n) => n.id === (network === "activitypub" ? "mastodon" : network),
				)
			) {
				const networkData = networkConfigData[category].find(
					(n) => n.id === (network === "activitypub" ? "mastodon" : network),
				);
				if (networkData.worker_configs.some((w) => w.worker.value === worker)) {
					workerExists = true;
					break;
				}
			}
		}
		row += workerExists ? " ✓ |" : "   |";
		if (workerExists) networkTotals[i]++;
	}
	workerTable += `${row}\n`;
}

// Add subtotal row
workerTable += `| Subtotal: | ${networkTotals.map((total) => ` ${total} |`).join("")}\n`;

// Calculate and add total workers row
const totalWorkers = networkTotals.reduce((a, b) => a + b, 0);
workerTable += `| Total workers: | ${totalWorkers} |${" |".repeat(networks.length - 1)}\n`;

// Update worker.md content
const workerPattern =
	/<!-- network-worker table starts -->[\s\S]*?<!-- network-worker table ends -->/;
const workerReplacement = `<!-- network-worker table starts -->\n${workerTable}<!-- network-worker table ends -->`;
const updatedWorkerContent = workerContent.replace(
	workerPattern,
	workerReplacement,
);
fs.writeFileSync(workerPath, updatedWorkerContent);

// Generate table for supported-networks.mdx
let supportedNetworksTable = `
<table style={{borderCollapse: 'collapse'}}>
  <thead>
    <tr>
      <th style={{padding: '4px 8px'}}>Network</th>
      <th style={{padding: '4px 8px'}}>Logo</th>
      <th style={{padding: '4px 8px'}}>Number of Workers</th>
    </tr>
  </thead>
  <tbody>
`;

for (let i = 0; i < networks.length; i++) {
	const network = networks[i];
	const assetInfo =
		network === "activitypub"
			? { ...networkAssetsData.networks.mastodon, name: "Activity Pub" }
			: networkAssetsData.networks[network] || { name: network, icon_url: "" };
	const logo = assetInfo.icon_url
		? `<img src="${assetInfo.icon_url}" alt="${assetInfo.name} logo" style={{width: '20px', height: '20px', verticalAlign: 'middle', display: 'inline-block'}} />`
		: "";
	supportedNetworksTable += `
    <tr>
      <td style={{padding: '4px 8px'}}>${assetInfo.name}</td>
      <td style={{padding: '4px 8px', lineHeight: 0}}>${logo}</td>
      <td style={{padding: '4px 8px'}}>${networkTotals[i]}</td>
    </tr>
  `;
}

supportedNetworksTable += `
    <tr>
      <td style={{padding: '4px 8px'}}><strong>Total:</strong></td>
      <td style={{padding: '4px 8px'}}></td>
      <td style={{padding: '4px 8px'}}><strong>${totalWorkers}</strong></td>
    </tr>
  </tbody>
</table>
`;

// Update supported-networks.mdx content
const supportedNetworksPattern =
	/{\/\*supported-network table starts\*\/}[\s\S]*?{\/\*supported-network table ends\*\/}/;
const supportedNetworksReplacement = `{/*supported-network table starts*/}\n\n${supportedNetworksTable}\n\n{/*supported-network table ends*/}`;
const updatedSupportedNetworksContent = supportedNetworksContent.replace(
	supportedNetworksPattern,
	supportedNetworksReplacement,
);
fs.writeFileSync(
	supportedNetworksPath,
	updatedSupportedNetworksContent,
	"utf8",
);

console.log("DSL info generation completed successfully.");
