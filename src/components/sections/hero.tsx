"use client";

import Section from "@/components/templates/section";
import TooltipAddress from "@/components/common/tooltip/address";
import WeatherTooltip from "@/components/common/tooltip/weather/weather";
import { useProviderHome } from "@/hooks/providers/useHomeProviders";
import { MapSkeleton } from "@/components/skeleton/maps";
import { Maps } from "@/components/common/maps";

export function Hero() {
	const { vLoad, vError } = useProviderHome();

	return (
		<Section>
			<div className="flex flex-col-reverse sm:flex-row gap-4 w-full h-full p-4 rounded-2xl glassess border-glassess">
				<div className="flex flex-col gap-8 w-full h-full">
					{/* Address */}
					<TooltipAddress />
					{/* Weather */}
					<WeatherTooltip />
				</div>
				{/* Only render Maps when not loading and no error */}
				<div className="relative w-full min-h-[300px] sm:min-h-full">
					{!vLoad && !vError ? (
						<Maps />
					) : (
						<MapSkeleton loading={vLoad} error={vError} />
					)}
				</div>
			</div>
		</Section>
	);
}
