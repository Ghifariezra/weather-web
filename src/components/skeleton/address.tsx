import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function AddressSkeleton() {
	return (
		<div className="flex items-center gap-2 text-xs w-full font-semibold p-2 border rounded-md animate-pulse">
			{/* Icon bulat placeholder */}
			<Skeleton className="w-4 h-4 rounded-full" />

			{/* Text placeholder */}
			<Skeleton className="h-4 w-32" />
		</div>
	);
}

export default memo(AddressSkeleton);
