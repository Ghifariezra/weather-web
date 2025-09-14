import { Hero } from "@/components/sections/hero";
import { Second } from "@/components/sections/second";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<Hero />
			<Second />
		</main>
	);
}
