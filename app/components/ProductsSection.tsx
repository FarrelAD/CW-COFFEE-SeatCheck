'use client';

import { useState, useRef } from 'react';
import ProductCard from './cards/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
	id: number;
	imageUrl: string;
	title: string;
	link?: string;
}

interface ProductCategory {
	name: string;
	products: Product[];
}

interface ProductsSectionProps {
	categories: ProductCategory[];
}

export default function ProductsSection({ categories }: ProductsSectionProps) {
	const [activeTab, setActiveTab] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const scrollAmount = 280; // card width + gap
			const newScrollLeft =
				scrollContainerRef.current.scrollLeft +
				(direction === 'right' ? scrollAmount : -scrollAmount);

			scrollContainerRef.current.scrollTo({
				left: newScrollLeft,
				behavior: 'smooth',
			});
		}
	};

	if (!categories || categories.length === 0) return null;

	const currentProducts = categories[activeTab]?.products || [];

	return (
		<div className="w-full">
			{/* Tabs */}
			<div className="flex justify-center gap-8 mb-8 border-b-2 border-gray-200">
				{categories.map((category, index) => (
					<button
						key={index}
						onClick={() => setActiveTab(index)}
						className={`pb-4 px-4 text-lg font-bold uppercase tracking-wide transition-all duration-300 relative ${activeTab === index
								? 'text-midnight-blue'
								: 'text-gray-400 hover:text-gray-600'
							}`}
					>
						{category.name}
						{activeTab === index && (
							<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-midnight-blue" />
						)}
					</button>
				))}
			</div>

			{/* Products Carousel */}
			<div className="relative">
				{/* Scroll Container */}
				<div
					ref={scrollContainerRef}
					className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
					style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				>
					{currentProducts.map((product) => (
						<ProductCard
							key={product.id}
							imageUrl={product.imageUrl}
							title={product.title}
							link={product.link}
						/>
					))}
				</div>

				{/* Navigation Arrows - Desktop */}
				<div className="hidden md:block">
					<button
						onClick={() => scroll('left')}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
						aria-label="Scroll left"
					>
						<ChevronLeft className="w-6 h-6 text-midnight-blue" />
					</button>

					<button
						onClick={() => scroll('right')}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
						aria-label="Scroll right"
					>
						<ChevronRight className="w-6 h-6 text-midnight-blue" />
					</button>
				</div>
			</div>

			{/* CSS to hide scrollbar */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
}
