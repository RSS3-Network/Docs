import type { IconRss3 } from "@rss3/web3-icons-react";
import type { LucideIcon } from "lucide-react";
import { TerminalIcon } from "lucide-react";
import type { HTMLAttributes } from "react";

export function IconContainer({
	icon: Icon,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	icon?: LucideIcon | (() => React.ReactNode) | typeof IconRss3;
}): React.ReactElement {
	return (
		<div
			{...props}
			className={`rounded-md border bg-gradient-to-b from-fd-secondary p-[1px] shadow-sm ${props.className}`}
		>
			{Icon ? <Icon /> : <TerminalIcon />}
		</div>
	);
}
