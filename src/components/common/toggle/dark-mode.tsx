"use client";

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	}, [setTheme]);

	if (!mounted) {
		// sementara jangan render apapun (atau render skeleton)
		return (
			<Button
				variant="outline"
				size="icon"
				className="relative cursor-pointer">
				<span className="sr-only">Toggle theme</span>
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					onClick={toggleTheme}
					className="relative cursor-pointer">
					{theme === "light" ? (
						<Moon className="size-4" />
					) : (
						<Sun className="size-4" />
					)}
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
