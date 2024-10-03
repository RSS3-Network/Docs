import { docs, meta } from "@/.source";
import { IconContainer } from "@/components/ui/icon";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { attachFile, createOpenAPI } from "fumadocs-openapi/server";
import { icons } from "lucide-react";
import { createElement } from "react";

export const source = loader({
	baseUrl: "/guide",
	source: createMDXSource(docs, meta),
	icon(icon) {
		if (icon && icon in icons)
			return createElement(IconContainer, {
				icon: icons[icon as keyof typeof icons],
			});
	},
	pageTree: {
		attachFile,
	},
});

export const openapi = createOpenAPI({
	generateTypeScriptSchema: false,
});
