"use client";

import { useState } from "react";
import OutletCard from "./cards/OutletCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Outlet } from "@/lib/types";

export default function OutletGrid({ outlets }: { outlets: Outlet[] }) {
	const [currentSlide, setCurrentSlide] = useState(0);

	if (!outlets || outlets.length === 0) return null;

	// Show first 4 outlets for desktop
	const displayedOutlets = outlets.slice(0, 4);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % outlets.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + outlets.length) % outlets.length);
	};

	return (
		<>
			{/* Desktop Layout - 4 outlets in a row with navigation */}
			<div className="hidden md:block relative">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{displayedOutlets.map((outlet) => (
						<OutletCard
							key={outlet.id}
							id={outlet.id}
							title={outlet.title}
							address={outlet.address}
							imageUrl={outlet.imageUrl}
							slug={outlet.slug}
							showReadMore={false}
						/>
					))}
				</div>

				{/* Navigation Arrows for Desktop */}
				{outlets.length > 4 && (
					<>
						<button
							onClick={prevSlide}
							className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
							aria-label="Previous outlets"
						>
							<ChevronLeft className="w-6 h-6 text-midnight-blue" />
						</button>

						<button
							onClick={nextSlide}
							className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
							aria-label="Next outlets"
						>
							<ChevronRight className="w-6 h-6 text-midnight-blue" />
						</button>
					</>
				)}
			</div>

			{/* Mobile Layout - Carousel (1 outlet at a time) */}
			<div className="md:hidden relative">
				{/* Carousel Container */}
				<div className="overflow-hidden rounded-2xl">
					<div
						className="flex transition-transform duration-500 ease-out"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						{outlets.map((outlet) => (
							<div key={outlet.id} className="min-w-full px-2">
								<OutletCard
									id={outlet.id}
									title={outlet.title}
									address={outlet.address}
									imageUrl={outlet.imageUrl}
									slug={outlet.slug}
									showReadMore={false}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Navigation Arrows */}
				<button
					onClick={prevSlide}
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
					aria-label="Previous outlet"
				>
					<ChevronLeft className="w-6 h-6 text-midnight-blue" />
				</button>

				<button
					onClick={nextSlide}
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
					aria-label="Next outlet"
				>
					<ChevronRight className="w-6 h-6 text-midnight-blue" />
				</button>

				{/* Dot Indicators */}
				<div className="flex justify-center gap-2 mt-6">
					{outlets.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								index === currentSlide
									? "bg-midnight-blue w-8"
									: "bg-gray-300 hover:bg-gray-400"
							}`}
							aria-label={`Go to outlet ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</>
	);
}
