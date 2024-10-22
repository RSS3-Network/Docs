import { metadataImage } from "@/utils/metadata-image";
import { generateOGImage } from "fumadocs-ui/og";

export const GET = metadataImage.createAPI((page) => {
	return generateOGImage({
		primaryColor: "#0072E7",
		primaryTextColor: "#FFFFFF",
		title: page.data.title,
		description: page.data.description,
		site: "RSS3 Docs",
		icon: (
			<svg
				role="presentation"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 1024 1024"
				width="50"
				height="50"
			>
				<rect width="100%" height="100%" fill="#1477FB" rx="5%" />
				<path
					fill="#fff"
					d="M810.274 803.422c-3.065 4.966-8.321 8.127-14.015 8.127H672.75c-6.131 0-11.825-3.612-14.453-9.481l-70.076-145.373c-4.818-9.481-14.453-15.801-24.965-15.801H349.962c-4.379 0-7.883 3.612-7.883 8.126v146.276c0 9.48-7.446 16.704-16.205 16.704h-97.669c-9.197 0-16.205-7.675-16.205-16.704V523.512c0-9.48 7.446-16.704 16.205-16.704h328.482c11.825 0 21.898-9.932 21.898-22.573V368.659c0-12.189-9.635-22.573-21.898-22.573H228.205c-9.197 0-16.205-7.675-16.205-16.705V228.704c0-9.481 7.446-16.704 16.205-16.704h343.811c9.197 0 16.205 7.675 16.205 16.704v79.91c0 12.19 9.635 22.573 21.899 22.573h82.339c9.198 0 16.205 7.675 16.205 16.705v157.11c0 9.481-7.445 16.705-16.205 16.705H610.12c-11.826 0-21.899 9.932-21.899 22.573v57.788c0 15.801 12.263 28.442 27.592 28.442h108.618c6.132 0 11.826 3.612 14.453 9.481l71.39 147.63c2.628 5.417 2.19 11.286-.876 16.253z"
				/>
			</svg>
		),
	});
});

export function generateStaticParams() {
	return metadataImage.generateParams();
}
