import { DocsLayout } from "fumadocs-ui/layout";
import type { ReactNode } from "react";
import { guideOptions } from "../layout.config";

export default function Layout({ children }: { children: ReactNode }) {
	return <DocsLayout {...guideOptions}>{children}</DocsLayout>;
}
