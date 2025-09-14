"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function ShowChartSummary({
	setChartType,
}: {
	setChartType: (value: string) => void;
}) {
	return (
		<div className="w-full">
			<Select
				defaultValue="default"
				onValueChange={(value) => setChartType(value)}>
				<SelectTrigger className="w-full cursor-pointer !bg-transparent">
					<SelectValue placeholder="Pilih Chart" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem className="cursor-pointer" value="default">
						Default
					</SelectItem>
					<SelectItem className="cursor-pointer" value="suhu">
						Suhu
					</SelectItem>
					<SelectItem className="cursor-pointer" value="kelembapan">
						Kelembapan
					</SelectItem>
					<SelectItem className="cursor-pointer" value="angin">
						Kecepatan Angin
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
