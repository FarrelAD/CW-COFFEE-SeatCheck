"use client";

/**
 * Admin Layout
 * Protects admin routes and provides consistent layout
 */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import AdminHeader from "./_components/AdminHeader";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, loading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	// Check if we're on the login page
	const isLoginPage = pathname === "/admin/login";

	useEffect(() => {
		if (!loading && !user && !isLoginPage) {
			router.push("/admin/login");
		}
	}, [user, loading, router, isLoginPage]);

	// Show loading state (but not on login page)
	if (loading && !isLoginPage) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue mx-auto mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// If on login page, just render it without protection
	if (isLoginPage) {
		return <>{children}</>;
	}

	// Don't render anything if not authenticated (will redirect)
	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<AdminHeader />
			<main>{children}</main>
		</div>
	);
}
