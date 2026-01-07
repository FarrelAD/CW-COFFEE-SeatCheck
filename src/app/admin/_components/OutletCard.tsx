"use client";

import Link from "next/link";
import type { Outlet } from "@/lib/types";

/**
 * Outlet Card Component for Admin Dashboard
 * Displays outlet information with link to admin page
 */
export default function OutletCard({ outlet }: { outlet: Outlet }) {
	return (
		<Link
			href={`/admin/outlet/${outlet.id}`}
			className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
		>
			{/* Outlet Image */}
			<div className="aspect-video bg-gray-200 overflow-hidden">
				<img
					src={outlet.imageUrl}
					alt={outlet.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
			</div>

			{/* Outlet Info */}
			<div className="p-6">
				<h3 className="text-xl font-bold text-midnight-blue mb-2 group-hover:text-[#082050] transition-colors">
					{outlet.title}
				</h3>
				<p className="text-gray-600 text-sm line-clamp-2">{outlet.address}</p>

				{/* View Button */}
				<div className="mt-4">
					<span className="text-midnight-blue font-medium text-sm group-hover:underline">
						Manage Outlet →
					</span>
				</div>
			</div>
		</Link>
	);
}
