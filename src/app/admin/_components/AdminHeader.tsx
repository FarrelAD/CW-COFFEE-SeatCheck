"use client";


import { useAuth } from "@/lib/hooks/use-auth";
import { useRouter } from "next/navigation";

/**
 * Admin Header Component
 * Displays header with logout button for admin pages
 */
export default function AdminHeader() {
	const { user, signOut } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await signOut();
			router.push("/admin/login");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<header className="bg-midnight-blue text-white shadow-lg">
			<div className="max-w-7xl mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					{/* Title */}
					<div>
						<h1 className="text-2xl font-bold">CW Coffee Admin</h1>
						{user && (
							<p className="text-sm text-gray-300 mt-1">
								{user.role === "super_admin" ? "Super Admin" : "Outlet Admin"} •{" "}
								{user.email}
							</p>
						)}
					</div>

					{/* Logout Button */}
					<button
						onClick={handleLogout}
						className="bg-white text-midnight-blue px-6 py-2 rounded-xl font-medium hover:bg-gray-100 transition-colors"
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	);
}
