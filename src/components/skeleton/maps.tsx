import Loader from "@/components/ui/loaders";
import { Skeleton } from "@/components/ui/skeleton";

export function MapSkeleton({
	loading,
	error,
}: {
	loading: boolean;
	error: boolean;
}) {
	return (
		<div className="relative w-full h-full rounded-2xl overflow-hidden border shadow-md bg-accent animate-pulse">
			{/* State: Loading */}
			{loading && !error && (
				<div className="absolute inset-0 flex items-center justify-center">
					<Loader />
				</div>
			)}

			{/* State: Error */}
			{error && (
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4">
					<h1 className="text-red-500 font-semibold">
						Something went wrong
					</h1>
					<p className="text-xs text-muted-foreground">
						Unable to load the map. Please try again.
					</p>
				</div>
			)}

			{/* Skeleton map grid background */}
			{loading && (
				<div className="grid grid-cols-3 gap-1 w-full h-full opacity-60">
					{Array.from({ length: 9 }).map((_, i) => (
						<Skeleton
							key={i}
							className="w-full h-full rounded-sm"
						/>
					))}
				</div>
			)}
		</div>
	);
}
