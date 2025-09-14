"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CsrfRequest } from "@/services/client/csrf";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: process.env.NODE_ENV === "development",
		}
	},
});

export function QueryProviders({ children }: { children: ReactNode }) {

	// First of all, fetch csrf token
	useEffect(() => {
		CsrfRequest();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			{children}
		</QueryClientProvider>
	);
}
