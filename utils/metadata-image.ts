import { source } from "@/app/source";
import { createMetadataImage } from "fumadocs-core/server";

export const metadataImage = createMetadataImage({
	source,
	imageRoute: "og",
});
