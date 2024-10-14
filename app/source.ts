import { docs, meta } from "@/.source";
import { IconContainer } from "@/components/ui/icon/container";
// import * as builtInIcons from "@/components/ui/icon/icons";
import * as web3Icons from "@rss3/web3-icons-react";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { attachFile, createOpenAPI } from "fumadocs-openapi/server";
import { icons as lucideIcons } from "lucide-react";
import { createElement } from "react";

export const source = loader({
	baseUrl: "/guide",
	source: createMDXSource(docs, meta),
	icon(icon) {
		// if (icon && icon in builtInIcons) {
		// 	return createElement(IconContainer, {
		// 		icon: builtInIcons[icon as keyof typeof builtInIcons],
		// 	});
		// }
		if (icon && icon in lucideIcons) {
			return createElement(IconContainer, {
				icon: lucideIcons[icon as keyof typeof lucideIcons],
			});
		}
		if (icon && `Icon${icon}` in web3Icons) {
			return createElement(IconContainer, {
				icon: web3Icons[`Icon${icon}` as keyof typeof web3Icons],
			});
		}
	},
	pageTree: {
		attachFile,
	},
});

export const openapi = createOpenAPI({
	generateTypeScriptSchema: false,
});
