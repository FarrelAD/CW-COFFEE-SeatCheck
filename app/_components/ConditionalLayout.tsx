'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import Footer from './footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	// Check if we're on a dashboard/outlet detail page
	const isDashboardPage = pathname?.startsWith('/category/outlet/') && pathname !== '/category/outlet';

	if (isDashboardPage) {
		// Don't render Header and Footer for dashboard pages
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
