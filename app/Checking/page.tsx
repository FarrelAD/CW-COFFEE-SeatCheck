'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Armchair } from 'lucide-react';

type SeatStatus = 'available' | 'occupied';

interface Seat {
	id: number;
	status: SeatStatus;
	type: 'chair' | 'sofa' | 'door';
}

export default function CheckingPage() {
	const [activeZone, setActiveZone] = useState('zona-ac-1');

	// Sample seat data for Zona AC 1
	const seats: Seat[] = [
		// Top left section (4x4 grid)
		...Array(16).fill(null).map((_, i) => ({
			id: i,
			status: Math.random() > 0.5 ? 'available' : 'occupied',
			type: 'chair',
		})),
		// Top right section (4x4 grid)
		...Array(16).fill(null).map((_, i) => ({
			id: i + 16,
			status: Math.random() > 0.5 ? 'available' : 'occupied',
			type: 'chair',
		})),
		// Bottom left section (4x4 grid)
		...Array(16).fill(null).map((_, i) => ({
			id: i + 32,
			status: Math.random() > 0.5 ? 'available' : 'occupied',
			type: 'chair',
		})),
		// Bottom right section (4x4 grid)
		...Array(16).fill(null).map((_, i) => ({
			id: i + 48,
			status: Math.random() > 0.5 ? 'available' : 'occupied',
			type: 'chair',
		})),
	] as Seat[];

	const SeatIcon = ({ status, type }: { status: SeatStatus; type: string }) => {
		const color = status === 'available' ? '#D1D5DB' : '#0a2463'; // gray-300 : navy
		
		if (type === 'door') {
			return (
				<svg className="w-5 h-6" viewBox="0 0 20 24" fill="none">
					<rect x="1" y="1" width="18" height="22" stroke={color} strokeWidth="2" fill="white" rx="1" />
					<circle cx="15" cy="12" r="1.5" fill={color} />
				</svg>
			);
		}

		// Armchair icon from lucide-react
		return (
			<Armchair 
				className="w-6 h-6" 
				fill={color}
				stroke={color}
				strokeWidth={1.5}
			/>
		);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-4xl mx-auto px-4 py-3">
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
								className="text-gray-900 font-bold hover:text-[#0a2463] transition-colors"
							>
								Cheking
							</Link>
						</div>

						{/* QR Scanner Button */}
						<button className="w-12 h-12 bg-[#0a2463] rounded-xl flex items-center justify-center hover:bg-[#082050] transition-colors">
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
			<main className="max-w-4xl mx-auto px-4 py-6 pb-24">
				{/* Zone Tabs */}
				<div className="flex items-center justify-center mb-6">
					<button
						onClick={() => setActiveZone('zona-ac-1')}
						className={`px-8 py-3 font-bold rounded-xl transition-colors ${
							activeZone === 'zona-ac-1'
								? 'bg-[#0a2463] text-yellow-400'
								: 'bg-[#0a2463] text-white hover:bg-[#082050]'
						}`}
					>
						Zona AC 1
					</button>
				</div>

				{/* Secondary Zone Buttons */}
				<div className="flex gap-3 mb-6 overflow-x-auto pb-2">
					<button
						onClick={() => setActiveZone('zona-ac-2')}
						className="px-6 py-2.5 bg-[#0a2463] text-yellow-400 font-bold rounded-lg whitespace-nowrap hover:bg-[#082050] transition-colors"
					>
						Zona AC 2
					</button>
					<button
						onClick={() => setActiveZone('semi-outdoor-1')}
						className="px-6 py-2.5 bg-[#0a2463] text-yellow-400 font-bold rounded-lg whitespace-nowrap hover:bg-[#082050] transition-colors"
					>
						SEMI OUTDOOR 1
					</button>
					<button
						onClick={() => setActiveZone('semi-outdoor-2')}
						className="px-6 py-2.5 bg-[#0a2463] text-yellow-400 font-bold rounded-lg whitespace-nowrap hover:bg-[#082050] transition-colors"
					>
						SEMI OUTDOOR 2
					</button>
					<button
						onClick={() => setActiveZone('outdoor')}
						className="px-6 py-2.5 bg-[#0a2463] text-yellow-400 font-bold rounded-lg whitespace-nowrap hover:bg-[#082050] transition-colors"
					>
						OUTDOOR
					</button>
				</div>

				{/* Floor Plan */}
				<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
					{/* Main Grid - 2x2 sections */}
					<div className="grid grid-cols-2 gap-0 relative">
						{/* Vertical center line */}
						<div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-900 -translate-x-1/2 z-10"></div>
						{/* Horizontal center line */}
						<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-900 -translate-y-1/2 z-10"></div>

						{/* TOP LEFT SECTION */}
						<div className="pr-8 pb-8">
							<div className="flex gap-2">
								{/* 6 Doors vertikal di kiri */}
								<div className="flex flex-col gap-0.5">
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="available" type="door" />
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="available" type="door" />
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="available" type="door" />
								</div>
								
								{/* Kursi area */}
								<div className="flex flex-col gap-2">
									{/* Row 1 - 4 kursi */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Row 2 - 4 kursi */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Row 3 - 4 kursi (abu-abu) */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
									</div>
									{/* Separator horizontal tebal */}
									<div className="h-1 bg-gray-900 my-0.5"></div>
									{/* Row 4 - 4 kursi bawah */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
								</div>
							</div>
						</div>

						{/* TOP RIGHT SECTION */}
						<div className="pl-8 pb-8">
							<div className="flex gap-3">
								{/* Main area */}
								<div className="flex flex-col gap-2">
									{/* Grid atas 4x4 */}
									<div className="grid grid-cols-4 gap-1">
										{Array(16).fill(null).map((_, i) => {
											const row = Math.floor(i / 4);
											const isGray = row === 2; // row ketiga abu-abu
											return <SeatIcon key={`tr-top-${i}`} status={isGray ? "available" : "occupied"} type="chair" />;
										})}
									</div>
									{/* Separator horizontal tebal (counter/bar) */}
									<div className="h-1 bg-gray-900 my-0.5"></div>
									{/* Grid bawah 4x4 */}
									<div className="grid grid-cols-4 gap-1">
										{Array(16).fill(null).map((_, i) => {
											const row = Math.floor(i / 4);
											const isGray = row === 2; // row ketiga abu-abu
											return <SeatIcon key={`tr-bottom-${i}`} status={isGray ? "available" : "occupied"} type="chair" />;
										})}
									</div>
								</div>
								{/* 2 kursi di pojok kanan atas */}
								<div className="flex flex-col gap-1">
									<SeatIcon status="available" type="chair" />
									<SeatIcon status="available" type="chair" />
								</div>
							</div>
						</div>

						{/* BOTTOM LEFT SECTION */}
						<div className="pr-8 pt-8">
							<div className="flex gap-2">
								{/* 6 Doors vertikal di kiri */}
								<div className="flex flex-col gap-0.5">
									<SeatIcon status="available" type="door" />
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="available" type="door" />
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="available" type="door" />
								</div>
								
								{/* Kursi area - 6 rows */}
								<div className="flex flex-col gap-1.5">
									{/* Row 1 - 4 kursi navy */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Separator */}
									<div className="h-0.5 bg-gray-900 my-0.5"></div>
									{/* Row 2 */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Row 3 */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
									</div>
									{/* Row 4 */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Row 5 */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Row 6 */}
									<div className="grid grid-cols-4 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
									</div>
								</div>
							</div>
						</div>

						{/* BOTTOM RIGHT SECTION - Most complex */}
						<div className="pl-8 pt-8">
							<div className="flex gap-2">
								{/* Left column - 2 kursi wide */}
								<div className="flex flex-col gap-1.5">
									{/* Top group - 2x2 */}
									<div className="grid grid-cols-2 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Bottom group - 2x4 (lebih panjang) */}
									<div className="grid grid-cols-2 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
								</div>

								{/* Center - 6 Doors vertikal */}
								<div className="flex flex-col gap-0.5">
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="available" type="door" />
									<SeatIcon status="available" type="door" />
									<SeatIcon status="occupied" type="door" />
									<SeatIcon status="occupied" type="door" />
								</div>

								{/* Right column - 2 kursi wide, banyak rows */}
								<div className="flex flex-col gap-1.5">
									{/* Row 1 */}
									<div className="grid grid-cols-2 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Row 2 */}
									<div className="grid grid-cols-2 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Row 3 */}
									<div className="grid grid-cols-2 gap-1">
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
									</div>
									{/* Row 4 */}
									<div className="grid grid-cols-2 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
									{/* Row 5 */}
									<div className="grid grid-cols-2 gap-1">
										<SeatIcon status="available" type="chair" />
										<SeatIcon status="available" type="chair" />
									</div>
									{/* Row 6 */}
									<div className="grid grid-cols-2 gap-1">
										<SeatIcon status="occupied" type="chair" />
										<SeatIcon status="occupied" type="chair" />
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Legend */}
					<div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t-2 border-gray-900">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-gray-300 rounded"></div>
							<span className="text-sm font-medium text-gray-700">
								Sudah Tersedia
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 bg-[#0a2463] rounded"></div>
							<span className="text-sm font-medium text-gray-700">
								Masih Digunakan
							</span>
						</div>
					</div>
				</div>
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
							<span className="text-sm font-medium text-gray-700">16</span>
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
