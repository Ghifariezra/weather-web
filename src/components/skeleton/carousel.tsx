"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CarouselSkeleton() {
	return (
		<div className="w-full relative">
			<div className="flex gap-2 overflow-hidden">
				{Array.from({ length: 3 }).map((_, i) => (
					<Card
						key={i}
						className="w-28 sm:w-40 md:w-48 flex flex-col justify-between">
						{/* Header */}
						<CardHeader>
							<Skeleton className="h-4 w-20 mx-auto" />
						</CardHeader>

						{/* Content */}
						<CardContent className="flex aspect-square items-center justify-center p-4">
							<div className="flex flex-col items-center gap-2">
								<Skeleton className="h-20 w-20 rounded-full" />
								<Skeleton className="h-5 w-12" /> {/* suhu */}
								<Skeleton className="h-4 w-16" />{" "}
								{/* deskripsi */}
							</div>
						</CardContent>

						{/* Footer */}
						<CardFooter className="flex flex-col items-center gap-1">
							<Skeleton className="h-4 w-20" /> {/* tanggal */}
							<Skeleton className="h-4 w-12" /> {/* jam */}
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
