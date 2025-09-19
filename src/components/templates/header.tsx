'use client';

import { ModeToggle } from "@/components/common/toggle/dark-mode";

export function Header() {
    return (
        <header className="w-full p-6 flex items-center justify-between bg-background border-b sticky top-0 z-50 border-glassess">
            <h1 className="text-2xl font-bold">Langit Kita</h1>
            <ModeToggle />
        </header>
    );
}