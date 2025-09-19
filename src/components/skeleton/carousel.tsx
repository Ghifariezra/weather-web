"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton({ width }: { width: number }) {
	const itemsToShow = width > 640 ? 4 : 3;

	return (
		<div className="w-full relative animate-pulse">
			<div className="flex gap-2 overflow-hidden">
				{Array.from({ length: itemsToShow }).map((_, i) => (
					<Card
						key={i}
						className="w-28 sm:w-40 md:w-48 flex flex-col justify-between">
						{/* Header */}
						<CardHeader className="flex items-center justify-center">
							<Skeleton className="h-4 w-16" /> {/* jam */}
						</CardHeader>

						{/* Content */}
						<CardContent className="flex aspect-square items-center justify-center p-6">
							<div className="flex flex-col items-center gap-3 w-full">
								<Skeleton className="w-24 h-24 rounded-full" />{" "}
								{/* icon */}
								<div className="flex flex-col items-center gap-1">
									<Skeleton className="h-5 w-12" />{" "}
									{/* suhu */}
									<Skeleton className="h-4 w-20" />{" "}
									{/* deskripsi */}
								</div>
								<Skeleton className="h-4 w-24" />{" "}
								{/* q title */}
							</div>
						</CardContent>

						{/* Footer */}
						<CardFooter className="flex items-center justify-center">
							<Skeleton className="h-9 w-28 rounded-md" />{" "}
							{/* button */}
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
