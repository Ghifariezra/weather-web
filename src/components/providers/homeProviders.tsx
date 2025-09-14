'use client';

import { ProviderHomeContext } from "@/hooks/providers/useHomeProviders";
import { useMaps } from "@/hooks/useMaps";

export function ProviderHome({
	children,
}: {
	children: React.ReactNode;
}) {
	const data = useMaps();
	return (
		<ProviderHomeContext.Provider value={data}>
			{children}
		</ProviderHomeContext.Provider>
	);
}
