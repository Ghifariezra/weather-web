"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function InfoItemSkeleton() {
	return (
		<div className="flex items-center gap-3 w-full p-3 rounded-xl">
			<Skeleton className="w-10 h-10 rounded-full" />
			<div className="flex flex-col w-full gap-2">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-3 w-20" />
			</div>
		</div>
	);
}

function WeatherSkeleton() {
	return (
		<div className="space-y-10 h-full w-full animate-pulse">
			{/* Seputar Langit */}
			<div className="flex flex-col gap-4 w-full">
				<Skeleton className="h-6 w-44" /> {/* heading */}
				<div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							key={i}
							className="flex flex-col-reverse sm:flex-row lg:flex-col gap-4 w-full p-4 border rounded-2xl">
							<div className="flex flex-col gap-4 w-full">
								<Skeleton className="h-5 w-28 mx-auto" />{" "}
								{/* nama hari */}
								<div className="flex flex-col items-center gap-4">
									<Skeleton className="w-16 h-16 rounded-full" />{" "}
									{/* icon */}
									<div className="flex flex-wrap gap-4 w-full justify-between">
										<div className="flex items-center gap-2">
											<Skeleton className="w-4 h-4 rounded" />
											<Skeleton className="h-4 w-20" />
										</div>
										<div className="flex items-center gap-2">
											<Skeleton className="w-4 h-4 rounded" />
											<Skeleton className="h-4 w-16" />
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<hr className="sm:hidden" />

			{/* Cuaca saat ini */}
			<div className="flex flex-col lg:flex-row gap-6 w-full items-center justify-center">
				<Skeleton className="aspect-square w-24 sm:w-32 h-24 sm:h-32 rounded-2xl" />{" "}
				{/* icon */}
				<div className="flex flex-col gap-4 items-center">
					<div className="flex items-baseline gap-2">
						<Skeleton className="h-16 sm:h-20 w-20 sm:w-28" />{" "}
						{/* suhu */}
						<Skeleton className="h-8 sm:h-10 w-8 sm:w-10 rounded" />{" "}
						{/* °C */}
					</div>
					<Skeleton className="h-5 sm:h-6 w-32 sm:w-40" />{" "}
					{/* deskripsi cuaca */}
				</div>
			</div>

			<hr className="sm:hidden" />

			{/* Info items */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
				{Array.from({ length: 3 }).map((_, i) => (
					<InfoItemSkeleton key={i} />
				))}
			</div>

			<hr className="sm:hidden" />

			{/* Ringkasan Hari Ini */}
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
					<Skeleton className="h-6 w-44" /> {/* heading */}
					<Skeleton className="h-8 w-28 rounded-md" />{" "}
					{/* dropdown */}
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full">
					{Array.from({ length: 4 }).map((_, i) => (
						<InfoItemSkeleton key={i} />
					))}
				</div>
			</div>
		</div>
	);
}

export default memo(WeatherSkeleton);
