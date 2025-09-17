import Image from "next/image";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { InfoItemProps } from "@/types/weather";

export function InfoItem({ icon, alt, value, unit, label, className }: InfoItemProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div
						className={`flex items-center gap-2 ${
							className ? className : "w-full"
						} cursor-pointer`}>
						<div className="relative w-16 h-16 border-glassess rounded-full">
							<div className="aspect-square w-full h-full">
								<Image
									src={icon}
									alt={alt}
									width={500}
									height={500}
									className={`object-cover w-full h-full scale-50`}
								/>
							</div>
						</div>
						<div className="flex flex-col w-full">
							<div className="flex w-full gap-1 text-xl">
								<h1 className="font-bold">{value ?? "-"}</h1>
								{unit && (
									<span className="text-base">{unit}</span>
								)}
							</div>
							<span className="text-sm line-clamp-1">
								{label}
							</span>
						</div>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p className="text-sm">
						{label}: {value ?? "-"} {unit ?? ""}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
