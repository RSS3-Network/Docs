import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
	redirect("/guide/core");

	return (
		<main className="flex h-screen flex-col justify-center text-center">
			<h1 className="mb-4 text-2xl font-bold">Welcome to RSS3 Docs</h1>
			<p className="text-fd-muted-foreground">
				You can open{" "}
				<Link
					href="/guide/core"
					className="text-fd-foreground font-semibold underline"
				>
					/guide/core
				</Link>{" "}
				and see the documentation.
			</p>
		</main>
	);
}
