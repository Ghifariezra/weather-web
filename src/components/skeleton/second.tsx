"use client";

import Section from "@/components/templates/section";
import { Skeleton } from "@/components/ui/skeleton";
import { CarouselSkeleton } from "@/components/skeleton/carousel";

export function SecondSkeleton() {
	return (
		<Section>
			<div className="flex flex-col w-full h-full gap-4 glassess border-glassess rounded-2xl p-4 sm:p-8 animate-pulse">
				{/* Bagian Carousel */}
				<div className="flex flex-col gap-4">
					<Skeleton className="h-6 w-32 sm:w-40" />
					<CarouselSkeleton />
				</div>

				{/* Bagian Chart */}
				<div className="flex flex-col gap-4">
					<Skeleton className="h-6 w-32 sm:w-40" />
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<Skeleton
								key={i}
								className="w-full h-40 sm:h-64 rounded-xl"
							/>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
