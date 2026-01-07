"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	// Check if we're on a dashboard/outlet detail page or admin page
	const isDashboardPage =
		pathname?.startsWith("/category/outlet/") &&
		pathname !== "/category/outlet";

	const isAdminPage = pathname?.startsWith("/admin");

	if (isDashboardPage || isAdminPage) {
		// Don't render Header and Footer for dashboard and admin pages
		return <>{children}</>;
	}

	// Render with Header and Footer for all other pages
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
