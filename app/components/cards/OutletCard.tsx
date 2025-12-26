'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function OutletCard({
	id,
	title,
	address,
	imageUrl,
	slug,
	showReadMore = true,
	className = '',
}: {
	id: string | number;
	title: string;
	address: string;
	imageUrl: string;
	slug: string;
	showReadMore?: boolean;
	className?: string;
}) {
	const [imageError, setImageError] = useState(false);

	return (
		<article
			id={`outlet-${id}`}
			className={`flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full ${className}`}
		>
			{/* Image Section - 16:10 Aspect Ratio */}
			<div className="relative w-full overflow-hidden bg-gray-200">
				<div className="relative w-full pb-[62.5%] overflow-hidden">
					<Link href={`/category/outlet/${slug}`} className="absolute top-0 left-0 w-full h-full block">
						{!imageError ? (
							<Image
								src={imageUrl}
								alt={title}
								fill
								className="object-cover transition-transform duration-300 hover:scale-105"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								onError={() => setImageError(true)}
							/>
						) : (
							<div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
								<svg
									className="w-16 h-16 text-gray-400 mb-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								<p className="text-sm text-gray-500 font-medium">Image not available</p>
							</div>
						)}
					</Link>
				</div>
			</div>

			{/* Content Section */}
			<div className="p-6 flex flex-col gap-3 flex-1">
				<Link
					className="no-underline group"
					href={`/category/outlet/${slug}`}
				>
					<h2 className="text-2xl font-bold text-[#1a2b4a] leading-tight transition-colors duration-300 group-hover:text-[#2d4a7c] m-0">
						{title}
					</h2>
				</Link>

				<div className="flex-1">
					<p className="text-base leading-relaxed text-gray-800 m-0">
						{address}
					</p>
				</div>

				{showReadMore && (
					<Link
						className="inline-flex items-center gap-2 text-sm font-bold text-[#1a2b4a] no-underline uppercase tracking-wide transition-all duration-300 hover:text-[#2d4a7c] hover:gap-3 mt-auto group"
						href={`/category/outlet/${slug}`}
					>
						READ MORE
						<span className="transition-transform duration-300 group-hover:translate-x-1">
							→
						</span>
					</Link>
				)}
			</div>
		</article>
	);
}
