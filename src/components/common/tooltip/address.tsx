"use client";

import { memo } from "react";
import { MapPin } from "lucide-react";
import { useProviderHome } from "@/hooks/providers/useHomeProviders";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import AddressSkeleton from "@/components/skeleton/address";

function TooltipAddress() {
	const { wDistrictData } = useProviderHome();

	if (!wDistrictData) return <AddressSkeleton />;

	return (
		<div className="relative w-full">
			<TooltipProvider delayDuration={150}>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="flex items-center gap-2 text-xs w-full font-semibold p-2 border rounded-md cursor-pointer">
							<MapPin className="w-4 h-4 shrink-0 text-red-500" />
							<span className="line-clamp-1 w-full">
								{wDistrictData.data.full_address}
							</span>
						</div>
					</TooltipTrigger>
					<TooltipContent side="top">
						<p>{wDistrictData.data.full_address}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}

export default memo(TooltipAddress);
