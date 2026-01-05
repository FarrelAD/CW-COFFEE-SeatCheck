'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface PromoSlide {
	id: number;
	imageUrl: string;
	alt: string;
	link?: string;
}

export default function PromoCarousel({
	slides,
	autoplayInterval = 5000,
	className = '',
}: {
	slides: PromoSlide[];
	autoplayInterval?: number; // in milliseconds
	className?: string;
}) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	const goToSlide = useCallback((index: number) => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex(index);
		setTimeout(() => setIsAnimating(false), 600);
	}, [isAnimating]);

	const nextSlide = useCallback(() => {
		const nextIndex = (currentIndex + 1) % slides.length;
		goToSlide(nextIndex);
	}, [currentIndex, slides.length, goToSlide]);

	const prevSlide = useCallback(() => {
		const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
		goToSlide(prevIndex);
	}, [currentIndex, slides.length, goToSlide]);

	// Auto-advance slides
	useEffect(() => {
		const timer = setInterval(() => {
			nextSlide();
		}, autoplayInterval);

		return () => clearInterval(timer);
	}, [nextSlide, autoplayInterval]);

	if (!slides || slides.length === 0) {
		return null;
	}

	return (
		<div className={`relative w-full overflow-hidden bg-white ${className}`}>
			{/* Slides Container */}
			<div className="relative w-full aspect-2061/700">
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
							}`}
					>
						<div className="relative w-full h-full">
							<Image
								src={slide.imageUrl}
								alt={slide.alt}
								fill
								className="object-cover"
								priority={index === 0}
								sizes="100vw"
							/>
							{slide.link && (
								<a
									href={slide.link}
									className="absolute inset-0 z-20"
									aria-label={`View ${slide.alt}`}
								/>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
				aria-label="Previous slide"
			>
				<svg
					className="w-6 h-6 text-gray-800"
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

			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
				aria-label="Next slide"
			>
				<svg
					className="w-6 h-6 text-gray-800"
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

			{/* Dot Indicators */}
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className="group relative w-3 h-3"
						aria-label={`Go to slide ${index + 1}`}
					>
						{/* Animated progress ring */}
						<svg
							className="absolute inset-0 w-full h-full -rotate-90"
							viewBox="0 0 14 14"
						>
							<circle
								cx="7"
								cy="7"
								r="5"
								fill="none"
								stroke="white"
								strokeWidth="2"
								opacity="0.3"
							/>
							{index === currentIndex && (
								<circle
									cx="7"
									cy="7"
									r="5"
									fill="none"
									stroke="white"
									strokeWidth="2"
									strokeDasharray="31.4"
									strokeDashoffset="0"
									strokeLinecap="round"
									className="animate-progress"
									style={{
										animation: `progress ${autoplayInterval}ms linear forwards`,
									}}
								/>
							)}
						</svg>
						{/* Center dot */}
						<div
							className={`absolute inset-0 m-auto w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
								? 'bg-white scale-100'
								: 'bg-white/60 scale-75 group-hover:scale-90'
								}`}
						/>
					</button>
				))}
			</div>

			{/* CSS for progress animation */}
			<style jsx>{`
				@keyframes progress {
					from {
						stroke-dashoffset: 31.4;
					}
					to {
						stroke-dashoffset: 0;
					}
				}
			`}</style>
		</div>
	);
}
