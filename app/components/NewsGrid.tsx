'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsItem {
	id: number;
	imageUrl: string;
	title: string;
	excerpt: string;
	link: string;
}

interface NewsGridProps {
	newsItems: NewsItem[];
}

export default function NewsGrid({ newsItems }: NewsGridProps) {
	const [currentSlide, setCurrentSlide] = useState(0);

	if (!newsItems || newsItems.length === 0) return null;

	const featuredNews = newsItems[0];
	const sideNews = newsItems.slice(1, 5);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % newsItems.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
	};

	return (
		<>
			{/* Desktop Layout - 2 columns */}
			<div className="hidden md:grid md:grid-cols-2 gap-6">
				{/* Left Column - Featured Large Card */}
				<div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
					{/* Image */}
					<Link href={featuredNews.link} className="block relative aspect-16/10 overflow-hidden">
						<Image
							src={featuredNews.imageUrl}
							alt={featuredNews.title}
							fill
							className="object-cover hover:scale-105 transition-transform duration-300"
							sizes="(max-width: 1200px) 50vw, 40vw"
						/>
					</Link>

					{/* Content */}
					<div className="p-6">
						<h3 className="text-2xl font-black text-midnight-blue mb-3 line-clamp-2">
							<Link href={featuredNews.link} className="hover:text-yellow-600 transition-colors">
								{featuredNews.title}
							</Link>
						</h3>

						<p className="text-gray-600 text-base font-semibold line-clamp-3 leading-relaxed mb-4">
							{featuredNews.excerpt}
						</p>

						{/* Read More Button */}
						<Link
							href={featuredNews.link}
							className="inline-block px-6 py-3 bg-midnight-blue text-white font-bold rounded-full hover:bg-midnight-blue/90 transition-colors duration-200 shadow-md hover:shadow-lg"
						>
							Read more
						</Link>
					</div>
				</div>

				{/* Right Column - 4 Smaller Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{sideNews.map((news) => (
						<div
							key={news.id}
							className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
						>
							<Link href={news.link} className="block relative aspect-16/10 overflow-hidden">
								<Image
									src={news.imageUrl}
									alt={news.title}
									fill
									className="object-cover hover:scale-105 transition-transform duration-300"
									sizes="(max-width: 1200px) 25vw, 20vw"
								/>
							</Link>

							<div className="p-4">
								<h3 className="text-base font-black text-midnight-blue mb-2 line-clamp-2 hover:text-yellow-600 transition-colors">
									<Link href={news.link}>
										{news.title}
									</Link>
								</h3>

								<p className="text-gray-600 text-xs font-semibold line-clamp-2 leading-relaxed">
									{news.excerpt}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Mobile Layout - Carousel */}
			<div className="md:hidden relative">
				{/* Carousel Container */}
				<div className="overflow-hidden rounded-2xl">
					<div
						className="flex transition-transform duration-500 ease-out"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}
					>
						{newsItems.map((news) => (
							<div key={news.id} className="min-w-full">
								<div className="bg-white rounded-2xl overflow-hidden shadow-md mx-2">
									<Link href={news.link} className="block relative aspect-16/10 overflow-hidden">
										<Image
											src={news.imageUrl}
											alt={news.title}
											fill
											className="object-cover"
											sizes="100vw"
										/>
									</Link>

									<div className="p-6">
										<h3 className="text-xl font-black text-midnight-blue mb-3 line-clamp-2">
											<Link href={news.link} className="hover:text-yellow-600 transition-colors">
												{news.title}
											</Link>
										</h3>

										<p className="text-gray-600 text-sm font-semibold line-clamp-3 leading-relaxed mb-4">
											{news.excerpt}
										</p>

										<Link
											href={news.link}
											className="inline-block px-6 py-3 bg-midnight-blue text-white font-bold rounded-full hover:bg-midnight-blue/90 transition-colors duration-200 shadow-md"
										>
											Read more
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Navigation Arrows */}
				<button
					onClick={prevSlide}
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
					aria-label="Previous news"
				>
					<ChevronLeft className="w-6 h-6 text-midnight-blue" />
				</button>

				<button
					onClick={nextSlide}
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
					aria-label="Next news"
				>
					<ChevronRight className="w-6 h-6 text-midnight-blue" />
				</button>

				{/* Dot Indicators */}
				<div className="flex justify-center gap-2 mt-6">
					{newsItems.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
									? 'bg-midnight-blue w-8'
									: 'bg-gray-300 hover:bg-gray-400'
								}`}
							aria-label={`Go to news ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</>
	);
}
