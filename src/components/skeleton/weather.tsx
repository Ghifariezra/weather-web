"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function InfoItemSkeleton() {
	return (
		<div className="flex items-center gap-2 w-full">
			<Skeleton className="w-12 h-12 rounded-full" />
			<div className="flex flex-col w-full gap-2">
				<Skeleton className="h-5 w-24" />
				<Skeleton className="h-4 w-20" />
			</div>
		</div>
	);
}

function WeatherSkeleton() {
	return (
		<div className="animate-pulse space-y-6 h-full w-full">
			{/* Seputar Langit */}
			<div className="flex flex-col gap-4 w-full">
				<Skeleton className="h-6 w-40" /> {/* heading */}
				<div className="flex flex-wrap lg:flex-nowrap gap-2 w-full">
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							key={i}
							className="flex flex-col-reverse sm:flex-row lg:flex-col gap-4 w-full p-4 border rounded-md">
							<div className="flex flex-col gap-4 w-full">
								<Skeleton className="h-5 w-24 mx-auto" />{" "}
								{/* nama hari */}
								<span className="flex flex-col items-center gap-4">
									<Skeleton className="w-16 h-16 rounded-full" />{" "}
									{/* icon */}
									<div className="flex flex-wrap gap-2 w-full justify-between">
										<div className="flex items-center gap-2">
											<Skeleton className="w-4 h-4 rounded" />
											<Skeleton className="h-4 w-20" />
										</div>
										<div className="flex items-center gap-2">
											<Skeleton className="w-4 h-4 rounded" />
											<Skeleton className="h-4 w-16" />
										</div>
									</div>
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<hr className="sm:hidden" />

			{/* Icon + suhu utama */}
			<div className="flex flex-col lg:flex-row gap-4 w-full items-center justify-center">
				<div className="aspect-square w-32 h-32">
					<Skeleton className="w-full h-full rounded-lg" />
				</div>
				<div className="flex flex-col gap-3 w-full h-full justify-center items-center">
					<div className="flex justify-center items-baseline gap-2">
						<Skeleton className="h-20 w-28" /> {/* angka suhu */}
						<Skeleton className="h-10 w-10 rounded" /> {/* °C */}
					</div>
					<Skeleton className="h-6 w-40" /> {/* deskripsi cuaca */}
				</div>
			</div>

			<hr className="sm:hidden" />

			{/* Info items */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
				<InfoItemSkeleton />
				<InfoItemSkeleton />
				<InfoItemSkeleton />
			</div>

			<hr className="sm:hidden" />

			{/* Ringkasan Hari Ini */}
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-wrap lg:flex-nowrap justify-between gap-2">
					<Skeleton className="h-6 w-40" /> {/* heading */}
					<Skeleton className="h-8 w-28 rounded-md" />{" "}
					{/* dropdown */}
				</div>
				<div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
					<InfoItemSkeleton />
					<InfoItemSkeleton />
					<InfoItemSkeleton />
				</div>
			</div>
		</div>
	);
}

export default memo(WeatherSkeleton);
