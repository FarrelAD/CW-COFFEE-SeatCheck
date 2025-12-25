'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
	const [currentTab, setCurrentTab] = useState('16');

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-md mx-auto px-4 py-3">
					{/* Navigation */}
					<div className="flex items-center justify-between">
						{/* Logo */}
						<Link href="/" className="flex items-center gap-2">
							<Image
								src="/logo-cw-200.png"
								alt="CW Coffee"
								width={48}
								height={48}
								className="w-12 h-12"
							/>
							<div className="flex flex-col">
								<span className="font-bold text-gray-900 text-lg leading-tight">
									Cw
								</span>
								<span className="font-bold text-gray-900 text-lg leading-tight">
									Coffee
								</span>
							</div>
						</Link>

						{/* Nav Links */}
						<div className="flex items-center gap-6">
							<Link
								href="/"
								className="text-gray-700 font-medium hover:text-[#0a2463] transition-colors"
							>
								Home
							</Link>
							<Link
								href="/Checking"
								className="text-gray-700 font-medium hover:text-[#0a2463] transition-colors"
							>
								Cheking
							</Link>
						</div>

						{/* QR Scanner Button */}
						<button className="w-12 h-12 bg-midnight-blue rounded-xl flex items-center justify-center hover:bg-[#082050] transition-colors">
							<svg
								className="w-6 h-6 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-md mx-auto px-4 py-6 pb-24">
				{/* Guide Book Card */}
				<div className="bg-midnight-blue rounded-3xl p-6 mb-6 relative overflow-hidden">
					<div className="relative z-10">
						<h2 className="text-white text-3xl font-bold mb-2">Guide Book</h2>
						<p className="text-white/90 text-sm mb-4 max-w-[200px]">
							Silakan baca terlebih dahulu untuk pemakaian Sistem ini
						</p>
						<button className="bg-white text-[#0a2463] font-bold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
							Readme
						</button>
					</div>

					{/* Illustration */}
					<div className="absolute right-0 top-1/2 -translate-y-1/2 w-52 h-52">
						<div className="relative w-full h-full">
							{/* Book Illustration */}
							<div className="absolute right-4 top-1/2 -translate-y-1/2 w-40 h-32 bg-white/20 backdrop-blur-sm rounded-lg transform rotate-12">
								<div className="p-4 grid grid-cols-2 gap-2">
									<div className="bg-white/30 rounded h-4"></div>
									<div className="bg-white/30 rounded h-4"></div>
									<div className="bg-white/30 rounded h-6"></div>
									<div className="bg-white/30 rounded h-6"></div>
								</div>
							</div>
							{/* Person Silhouette */}
							<div className="absolute right-12 bottom-2 w-16 h-20 bg-[#082050] rounded-t-full"></div>
							{/* Question Mark */}
							<div className="absolute right-2 bottom-4 text-white/40 text-4xl font-bold">
								?
							</div>
							{/* Plane Icon */}
							<div className="absolute left-4 top-4">
								<svg
									className="w-8 h-8 text-white/40 transform -rotate-45"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Capacity Cards */}
				<div className="grid grid-cols-2 gap-4 mb-6">
					{/* Ruang AC 1 */}
					<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
						<h3 className="text-gray-900 font-bold text-lg mb-1">Kapasitas</h3>
						<p className="text-gray-500 text-sm mb-4">Ruang AC 1</p>

						{/* Circular Progress */}
						<div className="relative w-32 h-32 mx-auto mb-4">
							<svg className="w-full h-full transform -rotate-90">
								{/* Background Circle */}
								<circle
									cx="64"
									cy="64"
									r="56"
									stroke="#E5E7EB"
									strokeWidth="12"
									fill="none"
								/>
								{/* Progress Circle */}
								<circle
									cx="64"
									cy="64"
									r="56"
									stroke="#0a2463"
									strokeWidth="12"
									fill="none"
									strokeDasharray={`${(150 / 200) * 352} 352`}
									strokeLinecap="round"
								/>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-4xl font-bold text-gray-900">150</span>
							</div>
						</div>

						{/* Legend */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-midnight-blue"></div>
								<span className="text-sm text-gray-700 font-medium">
									Terpakai
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-gray-300"></div>
								<span className="text-sm text-gray-700">Belum Terpakai</span>
							</div>
						</div>
					</div>

					{/* Ruang AC 2 */}
					<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
						<h3 className="text-gray-900 font-bold text-lg mb-1">Kapasitas</h3>
						<p className="text-gray-500 text-sm mb-4">Ruang AC 2</p>

						{/* Circular Progress */}
						<div className="relative w-32 h-32 mx-auto mb-4">
							<svg className="w-full h-full transform -rotate-90">
								{/* Background Circle */}
								<circle
									cx="64"
									cy="64"
									r="56"
									stroke="#E5E7EB"
									strokeWidth="12"
									fill="none"
								/>
								{/* Progress Circle */}
								<circle
									cx="64"
									cy="64"
									r="56"
									stroke="#0a2463"
									strokeWidth="12"
									fill="none"
									strokeDasharray={`${(150 / 200) * 352} 352`}
									strokeLinecap="round"
								/>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-4xl font-bold text-gray-900">150</span>
							</div>
						</div>

						{/* Legend */}
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-midnight-blue"></div>
								<span className="text-sm text-gray-700 font-medium">
									Terpakai
								</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 rounded-full bg-gray-300"></div>
								<span className="text-sm text-gray-700">Belum Terpakai</span>
							</div>
						</div>
					</div>
				</div>

				{/* Lihat Lainnya Button */}
				<button className="w-full bg-midnight-blue text-white font-bold py-4 rounded-2xl hover:bg-[#082050] transition-colors">
					Lihat Lainnya
				</button>
			</main>

			{/* Bottom Navigation */}
			<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
				<div className="max-w-md mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						{/* Left Arrow */}
						<button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
							<svg
								className="w-6 h-6 text-gray-600"
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

						{/* Right Arrow */}
						<button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
							<svg
								className="w-6 h-6 text-gray-600"
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

						{/* Plus Button */}
						<button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
							<svg
								className="w-6 h-6 text-gray-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4v16m8-8H4"
								/>
							</svg>
						</button>

						{/* Tab Number */}
						<button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
							<span className="text-sm font-medium text-gray-700">
								{currentTab}
							</span>
						</button>

						{/* More Menu */}
						<button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
							<svg
								className="w-6 h-6 text-gray-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
							</svg>
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
}
