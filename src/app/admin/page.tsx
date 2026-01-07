"use client";

/**
 * Admin Dashboard Page
 * Shows all outlets for super admin, redirects outlet admin to their outlet
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { outlets } from "@/lib/data/outlets";
import OutletCard from "./_components/OutletCard";

export default function AdminDashboardPage() {
	const { user } = useAuth();
	const router = useRouter();

	// Redirect outlet admins to their assigned outlet
	useEffect(() => {
		if (user && user.role === "admin" && user.assignedOutletId) {
			router.push(`/admin/outlet/${user.assignedOutletId}`);
		}
	}, [user, router]);

	// Show loading or nothing for outlet admins (they'll be redirected)
	if (!user || user.role === "admin") {
		return (
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue mx-auto mb-4"></div>
					<p className="text-gray-600">Redirecting...</p>
				</div>
			</div>
		);
	}

	// Super admin view - show all outlets
	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			{/* Page Header */}
			<div className="mb-8">
				<h2 className="text-3xl font-bold text-midnight-blue mb-2">
					Outlet Management
				</h2>
				<p className="text-gray-600">
					Select an outlet to manage seats and monitor capacity
				</p>
			</div>

			{/* Outlets Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{outlets.map((outlet) => (
					<OutletCard key={outlet.id} outlet={outlet} />
				))}
			</div>
		</div>
	);
}
