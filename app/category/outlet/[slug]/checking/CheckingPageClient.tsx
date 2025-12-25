'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Armchair, DoorOpen } from 'lucide-react';

type SeatStatus = 'available' | 'occupied';

interface Seat {
	id: number;
	status: SeatStatus;
	type: 'chair' | 'table' | 'door';
}

interface CheckingPageClientProps {
	outletTitle: string;
	outletAddress: string;
	slug: string;
	ac1Available: number;
	ac2Available: number;
	ac1Used: number;
	ac2Used: number;
}

// Seat Icon Component
const SeatIcon = ({ status, type }: { status: SeatStatus; type: string }) => {
	const isOccupied = status === 'occupied';
	const color = isOccupied ? '#0a2463' : '#D1D5DB'; // navy : gray-300

	if (type === 'door') {
		return (
			<DoorOpen
				className="w-6 h-6"
				color={color}
				fill={isOccupied ? color : 'none'}
				strokeWidth={2}
			/>
		);
	}

	// Chair icon (both chair and table use Armchair)
	return (
		<Armchair
			className="w-6 h-6"
			color={color}
			fill={isOccupied ? color : 'none'}
			strokeWidth={2}
		/>
	);
};

export default function CheckingPageClient({
	outletTitle,
	outletAddress,
	slug,
	ac1Available,
	ac2Available,
	ac1Used,
	ac2Used,
}: CheckingPageClientProps) {
	const [activeZone, setActiveZone] = useState('zona-ac-1');

	// Generate seat data based on capacity
	const generateSeats = (used: number, total: number): Seat[] => {
		const seats: Seat[] = [];
		for (let i = 0; i < total; i++) {
			seats.push({
				id: i,
				status: i < used ? 'occupied' : 'available',
				type: i % 5 === 0 ? 'table' : 'chair',
			});
		}
		return seats;
	};

	const ac1Seats = generateSeats(ac1Used, ac1Used + ac1Available);
	const ac2Seats = generateSeats(ac2Used, ac2Used + ac2Available);

	return (
		<main className="max-w-4xl mx-auto px-4 py-6 pb-24">
			{/* Header Info */}
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-1">{outletTitle}</h1>
				<p className="text-gray-600 text-sm">{outletAddress}</p>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				<div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
					<div className="text-3xl font-bold text-green-600 mb-1">
						{ac1Available}
					</div>
					<div className="text-xs text-gray-600">Tersedia AC 1</div>
				</div>
				<div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
					<div className="text-3xl font-bold text-green-600 mb-1">
						{ac2Available}
					</div>
					<div className="text-xs text-gray-600">Tersedia AC 2</div>
				</div>
			</div>

			{/* Zone Tabs */}
			<div className="flex items-center justify-center mb-6">
				<button
					onClick={() => setActiveZone('zona-ac-1')}
					className={`px-8 py-3 font-bold rounded-xl transition-colors ${activeZone === 'zona-ac-1'
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
					className={`px-6 py-2.5 font-bold rounded-lg whitespace-nowrap transition-colors ${activeZone === 'zona-ac-2'
						? 'bg-[#0a2463] text-yellow-400'
						: 'bg-[#0a2463] text-white hover:bg-[#082050]'
						}`}
				>
					Zona AC 2
				</button>
				<button
					onClick={() => setActiveZone('semi-outdoor-1')}
					className={`px-6 py-2.5 font-bold rounded-lg whitespace-nowrap transition-colors ${activeZone === 'semi-outdoor-1'
						? 'bg-[#0a2463] text-yellow-400'
						: 'bg-[#0a2463] text-white hover:bg-[#082050]'
						}`}
				>
					SEMI OUTDOOR 1
				</button>
				<button
					onClick={() => setActiveZone('semi-outdoor-2')}
					className={`px-6 py-2.5 font-bold rounded-lg whitespace-nowrap transition-colors ${activeZone === 'semi-outdoor-2'
						? 'bg-[#0a2463] text-yellow-400'
						: 'bg-[#0a2463] text-white hover:bg-[#082050]'
						}`}
				>
					SEMI OUTDOOR 2
				</button>
				<button
					onClick={() => setActiveZone('outdoor')}
					className={`px-6 py-2.5 font-bold rounded-lg whitespace-nowrap transition-colors ${activeZone === 'outdoor'
						? 'bg-[#0a2463] text-yellow-400'
						: 'bg-[#0a2463] text-white hover:bg-[#082050]'
						}`}
				>
					OUTDOOR
				</button>
			</div>

			{/* Floor Plan */}
			<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
				{activeZone === 'zona-ac-1' && (
					<>
						<h3 className="text-lg font-bold text-gray-900 mb-4">Zona AC 1</h3>
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
										{ac1Seats.slice(0, 6).map((seat) => (
											<SeatIcon key={`door-tl-${seat.id}`} status={seat.status} type="door" />
										))}
									</div>

									{/* Kursi area */}
									<div className="flex flex-col gap-2">
										{/* Row 1 - 4 kursi */}
										<div className="grid grid-cols-4 gap-1">
											{ac1Seats.slice(6, 10).map((seat) => (
												<SeatIcon key={`tl-r1-${seat.id}`} status={seat.status} type={seat.type} />
											))}
										</div>
										{/* Row 2 - 4 kursi */}
										<div className="grid grid-cols-4 gap-1">
											{ac1Seats.slice(10, 14).map((seat) => (
												<SeatIcon key={`tl-r2-${seat.id}`} status={seat.status} type={seat.type} />
											))}
										</div>
										{/* Row 3 - 4 kursi */}
										<div className="grid grid-cols-4 gap-1">
											{ac1Seats.slice(14, 18).map((seat) => (
												<SeatIcon key={`tl-r3-${seat.id}`} status={seat.status} type={seat.type} />
											))}
										</div>
										{/* Separator horizontal tebal */}
										<div className="h-1 bg-gray-900 my-0.5"></div>
										{/* Row 4 - 4 kursi bawah */}
										<div className="grid grid-cols-4 gap-1">
											{ac1Seats.slice(18, 22).map((seat) => (
												<SeatIcon key={`tl-r4-${seat.id}`} status={seat.status} type={seat.type} />
											))}
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
											{ac1Seats.slice(22, 38).map((seat) => (
												<SeatIcon key={`tr-top-${seat.id}`} status={seat.status} type={seat.type} />
											))}
										</div>
										{/* Separator horizontal tebal (counter/bar) */}
										<div className="h-1 bg-gray-900 my-0.5"></div>
										{/* Grid bawah 4x4 */}
										<div className="grid grid-cols-4 gap-1">
											{ac1Seats.slice(38, 54).map((seat) => (
												<SeatIcon key={`tr-bottom-${seat.id}`} status={seat.status} type={seat.type} />
											))}
										</div>
									</div>
									{/* 2 kursi di pojok kanan atas */}
									<div className="flex flex-col gap-1">
										{ac1Seats.slice(54, 56).map((seat) => (
											<SeatIcon key={`tr-corner-${seat.id}`} status={seat.status} type={seat.type} />
										))}
									</div>
								</div>
							</div>

							{/* BOTTOM LEFT SECTION */}
							<div className="pr-8 pt-8">
								<div className="flex gap-2">
									{/* 6 Doors vertikal di kiri */}
									<div className="flex flex-col gap-0.5">
										{ac1Seats.slice(56, 62).map((seat) => (
											<SeatIcon key={`door-bl-${seat.id}`} status={seat.status} type="door" />
										))}
									</div>

									{/* Kursi area - 6 rows */}
									<div className="flex flex-col gap-1.5">
										{/* Row 1 - 4 kursi */}
										<div className="grid grid-cols-4 gap-1">
											{ac1Seats.slice(62, 66).map((seat) => (
												<SeatIcon key={`bl-r1-${seat.id}`} status={seat.status} type={seat.type} />
											))}
										</div>
										{/* Separator */}
										<div className="h-0.5 bg-gray-900 my-0.5"></div>
										{/* Row 2-6 */}
										{[0, 1, 2, 3, 4].map((rowIdx) => (
											<div key={`bl-row-${rowIdx}`} className="grid grid-cols-4 gap-1">
												{ac1Seats.slice(66 + rowIdx * 4, 70 + rowIdx * 4).map((seat) => (
													<SeatIcon key={`bl-r${rowIdx + 2}-${seat.id}`} status={seat.status} type={seat.type} />
												))}
											</div>
										))}
									</div>
								</div>
							</div>

							{/* BOTTOM RIGHT SECTION */}
							<div className="pl-8 pt-8">
								<div className="flex gap-2">
									{/* Left column - 2 kursi wide */}
									<div className="flex flex-col gap-1.5">
										{/* Top group - 2x2 */}
										<div className="grid grid-cols-2 gap-1">
											{ac1Seats.slice(86, 90).map((seat) => (
												<SeatIcon key={`br-left-top-${seat.id}`} status={seat.status} type={seat.type} />
											))}
										</div>
										{/* Bottom group - 2x4 */}
										<div className="grid grid-cols-2 gap-1">
											{ac1Seats.slice(90, 98).map((seat) => (
												<SeatIcon key={`br-left-bottom-${seat.id}`} status={seat.status} type={seat.type} />
											))}
										</div>
									</div>

									{/* Center - 6 Doors vertikal */}
									<div className="flex flex-col gap-0.5">
										{ac1Seats.slice(98, 104).map((seat) => (
											<SeatIcon key={`door-br-${seat.id}`} status={seat.status} type="door" />
										))}
									</div>

									{/* Right column - 2 kursi wide, banyak rows */}
									<div className="flex flex-col gap-1.5">
										{[0, 1, 2, 3, 4, 5].map((rowIdx) => (
											<div key={`br-right-row-${rowIdx}`} className="grid grid-cols-2 gap-1">
												{ac1Seats.slice(104 + rowIdx * 2, 106 + rowIdx * 2).map((seat) => (
													<SeatIcon key={`br-r${rowIdx}-${seat.id}`} status={seat.status} type={seat.type} />
												))}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{activeZone === 'zona-ac-2' && (
					<>
						<h3 className="text-lg font-bold text-gray-900 mb-4">Zona AC 2</h3>
						<div className="grid grid-cols-6 gap-2">
							{ac2Seats.map((seat) => (
								<div key={`ac2-${seat.id}`} className="flex items-center justify-center">
									<SeatIcon status={seat.status} type={seat.type} />
								</div>
							))}
						</div>
					</>
				)}

				{(activeZone === 'semi-outdoor-1' || activeZone === 'semi-outdoor-2' || activeZone === 'outdoor') && (
					<div className="text-center py-12">
						<p className="text-gray-500">Dena untuk zona ini sedang dalam pengembangan</p>
					</div>
				)}

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

			{/* Back to Dashboard Button */}
			<Link
				href={`/category/outlet/${slug}`}
				className="block w-full mt-6 bg-midnight-blue text-white font-bold py-4 rounded-2xl hover:bg-[#082050] transition-colors text-center"
			>
				Kembali ke Dashboard
			</Link>
		</main>
	);
}
