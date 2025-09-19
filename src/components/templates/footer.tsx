import Image from "next/image";
import Link from "next/link";
import { CloudSun } from "lucide-react";

export function Footer() {
	return (
		<footer className="w-full p-6 flex flex-col sm:flex-row items-center justify-center gap-3 bg-background border-t border-glassess text-sm text-muted-foreground">
			{/* Label */}
			<div className="flex items-center gap-2">
				<CloudSun className="w-4 h-4 text-blue-500 animate-pulse" />
				<span>Data cuaca berasal dari</span>
			</div>

			{/* BMKG Link */}
			<Link
				href="https://data.bmkg.go.id/prakiraan-cuaca/"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300">
				<Image
					src="https://data.bmkg.go.id/include/assets/img/logo-bmkg.svg"
					alt="Logo BMKG"
					width={100}
					height={100}
					className="relative object-contain h-6 w-fit"
				/>
				<span className="w-full h-6">BMKG</span>
			</Link>
		</footer>
	);
}
