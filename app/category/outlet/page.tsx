'use client';

import OutletCard from "@/app/_components/cards/OutletCard";
import { outlets } from "@/app/_repository/outlets";
import Link from "next/link";
import { useState } from "react";

export default function Outlet() {
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 12;

	// Calculate pagination
	const totalPages = Math.ceil(outlets.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentOutlets = outlets.slice(startIndex, endIndex);

	// Handle page change
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll to top of outlet section
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			{/* Breadcrumb Section */}
			<div className="bg-white py-6">
				<div className="container mx-auto px-4 max-w-7xl">
					<nav className="flex items-center justify-center gap-2 text-sm">
						<Link
							href="/"
							className="text-gray-600 hover:text-[#1a2b4a] transition-colors"
						>
							Home
						</Link>
						<span className="text-gray-400">›</span>
						<Link
							href="/category"
							className="text-gray-600 hover:text-[#1a2b4a] transition-colors"
						>
							Posts
						</Link>
						<span className="text-gray-400">›</span>
						<span className="text-gray-900 font-medium">Outlet</span>
					</nav>
				</div>
			</div>

			{/* Page Title */}
			<div className="bg-white pb-6">
				<div className="container mx-auto px-4 max-w-7xl">
					<h1 className="text-4xl md:text-5xl font-bold text-[#1a2b4a] text-center">
						Outlet
					</h1>
				</div>
			</div>

			{/* Outlet Cards Grid */}
			<div className="bg-icy-lavender py-12 pb-20">
				<div className="container mx-auto px-4 max-w-7xl">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{currentOutlets.map((outlet) => (
							<OutletCard
								key={outlet.id}
								id={outlet.id}
								title={outlet.title}
								address={outlet.address}
								imageUrl={outlet.imageUrl}
								slug={outlet.slug}
							/>
						))}
					</div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="flex justify-center items-center gap-2 mt-12">
							{/* Previous Button */}
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${currentPage === 1
									? 'border-gray-300 text-gray-400 cursor-not-allowed'
									: 'border-[#1a2b4a] text-[#1a2b4a] hover:bg-[#1a2b4a] hover:text-white'
									}`}
								aria-label="Previous page"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>

							{/* Page Numbers */}
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-medium transition-all duration-200 ${currentPage === page
										? 'bg-[#1a2b4a] text-white border-[#1a2b4a]'
										: 'border-[#1a2b4a] text-[#1a2b4a] hover:bg-[#1a2b4a] hover:text-white'
										}`}
								>
									{page}
								</button>
							))}

							{/* Next Button */}
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${currentPage === totalPages
									? 'border-gray-300 text-gray-400 cursor-not-allowed'
									: 'border-[#1a2b4a] text-[#1a2b4a] hover:bg-[#1a2b4a] hover:text-white'
									}`}
								aria-label="Next page"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}