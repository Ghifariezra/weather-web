import Section from "@/components/templates/section";
import { CarouselCards } from "@/components/common/carousel/carousel";

export function Second() {
	return (
		<Section>
			<div className="flex w-full h-full gap-4 glassess border-glassess rounded-2xl p-8">
				<div className="flex flex-col w-full h-full gap-4">
					<h1 className="text-lg sm:text-xl font-bold">
						Update Aura Tiap Jam
					</h1>
					<CarouselCards />
				</div>
			</div>
		</Section>
	);
}
