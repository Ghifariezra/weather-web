"use client";

import Section from "@/components/templates/section";
import { Skeleton } from "@/components/ui/skeleton";
import { CarouselSkeleton } from "@/components/skeleton/carousel";

export function SecondSkeleton() {
	return (
		<Section>
			<div className="flex flex-col w-full h-full gap-4 glassess border-glassess rounded-2xl p-8 animate-pulse">
				{/* Bagian Carousel */}
				<div className="flex flex-col w-full h-full gap-4">
					<Skeleton className="h-6 w-40" /> {/* Judul */}
					<CarouselSkeleton /> {/* Skeleton carousel */}
				</div>

				{/* Bagian Chart */}
				<div className="flex flex-col w-full h-full gap-4">
					<Skeleton className="h-6 w-40" /> {/* Judul */}
					<div className="w-full h-64 flex items-center justify-center">
						<Skeleton className="w-full h-full rounded-xl" />{" "}
						{/* Chart area */}
					</div>
				</div>
			</div>
		</Section>
	);
}
