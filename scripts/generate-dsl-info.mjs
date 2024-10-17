import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// API endpoint
const NETWORK_CONFIG_ENDPOINT = "https://gi.rss3.io";

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
			networks.push(network.id);
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
const workerTableHeader = `| Network/Worker | ${networks.join(" | ")} |\n| --- | ${networks.map(() => "---").join(" | ")} |\n`;

// Generate table rows for worker.md
const networkTotals = new Array(networks.length).fill(0);
const workerTableRows = workersList
	.map((worker) => {
		const displayName = worker === "core" ? `**${worker}**[1]` : worker;
		const row = networks.map((network, i) => {
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
				} else if (networkConfigData[category].some((n) => n.id === network)) {
					const networkData = networkConfigData[category].find(
						(n) => n.id === network,
					);
					if (
						networkData.worker_configs.some((w) => w.worker.value === worker)
					) {
						workerExists = true;
						break;
					}
				}
			}
			if (workerExists) networkTotals[i]++;
			return workerExists ? "✓" : " ";
		});
		return `| ${displayName} | ${row.join(" | ")} |`;
	})
	.join("\n");

// Add subtotal and total rows
const subtotalRow = `| **Subtotal** | ${networkTotals.join(" | ")} |`;
const totalWorkers = networkTotals.reduce((a, b) => a + b, 0);

const workerTable = `${workerTableHeader}${workerTableRows}\n${subtotalRow}`;

// Update worker.md content
const workerPattern =
	/<!-- network-worker table starts -->[\s\S]*?<!-- network-worker table ends -->/;
const workerReplacement = `<!-- network-worker table starts -->\n${workerTable}\n<!-- network-worker table ends -->`;
const updatedWorkerContent = workerContent.replace(
	workerPattern,
	workerReplacement,
);
fs.writeFileSync(workerPath, updatedWorkerContent);

// Generate table for supported-networks.mdx
const supportedNetworksTableStyle = `
<table id="network-table">
	<thead>
		<tr>
			<th>Network</th>
			<th>Workers</th>
		</tr>
	</thead>
	<tbody>
`;

function getAssetInfo(network, networkAssetsData) {
	return (
		networkAssetsData.networks[network] || {
			icon_url: "",
			name: network,
		}
	);
}

function getLogo(network, assetInfo) {
	const logos = {
		mastodon: "/logo/mastodon.svg",
		rss: "/logo/rss.svg",
	};

	if (logos[network]) {
		return `<img src="${logos[network]}" alt="${assetInfo.name} logo"/>`;
	}

	return assetInfo.icon_url
		? `<img src="${assetInfo.icon_url}" alt="${assetInfo.name} logo"/>`
		: "";
}

const supportedNetworksTableRows = networks
	.map((network, i) => {
		const assetInfo = getAssetInfo(network, networkAssetsData);
		const logo = getLogo(network, assetInfo);

		return `
	<tr>
		<td>
			<div>${logo}${assetInfo.name}</div>
		</td>
		<td>
			${networkTotals[i]}
		</td>
	</tr>
	`;
	})
	.join("");

const supportedNetworksTableFooter = `
	<tr>
		<td>
			<div>
			<strong>
				<span style={{"margin-right": "1rem"}}>Total: </span>
				<span> ${networks.length} </span>
			</strong>
			</div>
		</td>
		<td>
			<strong> ${totalWorkers} </strong>
		</td>
	</tr>
	</tbody>
</table>
`;

const supportedNetworksTable = `${supportedNetworksTableStyle}${supportedNetworksTableRows}${supportedNetworksTableFooter}`;

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
