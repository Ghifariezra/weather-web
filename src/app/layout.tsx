import { QueryProviders } from "@/components/providers/queryClient";
import { ProviderHome } from "@/components/providers/homeProviders";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { metaRoot } from "@/utils/metadata";
import { geistMono, geistSans } from "@/utils/font";
import "./globals.css";

export const metadata = metaRoot;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<QueryProviders>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem>
						<ProviderHome>{children}</ProviderHome>
					</ThemeProvider>
				</QueryProviders>
			</body>
		</html>
	);
}
