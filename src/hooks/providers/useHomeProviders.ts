'use client';

import { createContext, useContext } from "react";
import { useMaps } from "@/hooks/useMaps";

export type ProviderHomeContext = ReturnType<typeof useMaps>;

export const ProviderHomeContext = createContext<ProviderHomeContext | null>(null);

export const useProviderHome = () => {
    const context = useContext(ProviderHomeContext);
    if (!context)
        throw new Error("useProviderHome must be used within a ProviderHome");
    return context;
};