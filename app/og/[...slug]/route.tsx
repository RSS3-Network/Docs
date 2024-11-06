import { baseUrl } from "@/utils/metadata";
import { metadataImage } from "@/utils/metadata-image";
import { ImageResponse } from "next/og";

export const GET = metadataImage.createAPI((page) => {
	return new ImageResponse(
		<img
			src={`${baseUrl}/banner.png`}
			alt="Background"
			width={1920}
			height={1080}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: -1,
			}}
		/>,
	);
});

export function generateStaticParams() {
	return metadataImage.generateParams();
}
