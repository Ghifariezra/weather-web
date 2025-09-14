export default function Section({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
		<section className="flex flex-col w-full min-h-screen items-center gap-6 p-6">
			{children}
		</section>
	);
}