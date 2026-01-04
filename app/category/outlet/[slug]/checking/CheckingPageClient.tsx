'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Armchair } from 'lucide-react';
import { outletLayouts, Block, AreaLayout, OutletLayout } from '../_repository/outlet_layouts';


// Helper function to parse coordinate ID (e.g., "A1" -> {row: 0, col: 0})
const parseCoordinate = (id: string): { row: number; col: number } | null => {
	const match = id.match(/^([A-P])(\d+)$/);
	if (!match) return null;

	const letter = match[1];
	const number = parseInt(match[2], 10);

	// A=0, B=1, C=2, ..., P=15 (columns)
	const col = letter.charCodeAt(0) - 'A'.charCodeAt(0);
	// 1=0, 2=1, 3=2, ... (rows)
	const row = number - 1;

	return { row, col };
};

export default function CheckingPageClient({
	outletTitle,
	outletAddress,
	slug,
	outletId,
	ac1Available,
	ac2Available,
}: {
	outletTitle: string;
	outletAddress: string;
	slug: string;
	outletId: number;
	ac1Available: number;
	ac2Available: number;
}) {
	const [activeZone, setActiveZone] = useState('zona-ac-1');
	const router = useRouter();

	// Get layout data for this outlet
	const outletLayout = useMemo(() => {
		return outletLayouts.find(layout => layout.id === outletId);
	}, [outletId]);

	// Create a map of coordinates to blocks for quick lookup
	const getBlocksMap = (areaName: string) => {
		if (!outletLayout) return new Map<string, Block>();

		const area = outletLayout.layout.find(a => a.area === areaName);
		if (!area) return new Map<string, Block>();

		const blocksMap = new Map<string, Block>();
		area.blocks.forEach(block => {
			const coord = parseCoordinate(block.id);
			if (coord) {
				const key = `${coord.row}-${coord.col}`;
				blocksMap.set(key, block);
			}
		});

		return blocksMap;
	};

	// Render a single grid block
	const renderGridBlock = (row: number, col: number, blocksMap: Map<string, Block>) => {
		const key = `${row}-${col}`;
		const block = blocksMap.get(key);

		if (block && block.type === 'chair') {
			// Render chair with Armchair icon
			const bgColor = block.status === 'used' ? 'bg-[#0a2463]' : 'bg-gray-300';
			const iconColor = block.status === 'used' ? '#ffffff' : '#0a2463';

			// Determine rotation based on face direction
			// Default Armchair icon faces right, so we rotate from there
			const rotationMap = {
				'right': 'rotate-270',      // 270° - faces right
				'down': 'rotate-0',         // 0° - faces down
				'left': 'rotate-90',        // 90° - faces left
				'up': '-rotate-180',        // 180° - faces up
			};

			const rotationClass = block.face ? rotationMap[block.face] : 'rotate-0';

			return (
				<div
					key={`block-${row}-${col}`}
					className={`w-[40px] h-[40px] border border-gray-300 flex items-center justify-center ${bgColor}`}
					title={`${block.id} - ${block.status} - facing ${block.face}`}
				>
					<Armchair
						className={`w-5 h-5 ${rotationClass}`}
						color={iconColor}
						fill={block.status === 'used' ? iconColor : 'none'}
						strokeWidth={2}
					/>
				</div>
			);
		}

		if (block && block.type === 'table') {
			// Check neighboring blocks to merge tables
			const topKey = `${row - 1}-${col}`;
			const bottomKey = `${row + 1}-${col}`;
			const leftKey = `${row}-${col - 1}`;
			const rightKey = `${row}-${col + 1}`;

			const hasTableTop = blocksMap.get(topKey)?.type === 'table';
			const hasTableBottom = blocksMap.get(bottomKey)?.type === 'table';
			const hasTableLeft = blocksMap.get(leftKey)?.type === 'table';
			const hasTableRight = blocksMap.get(rightKey)?.type === 'table';

			// Calculate width and height - extend to 40px when adjacent tables exist
			const width = hasTableLeft || hasTableRight ? 'w-[40px]' : 'w-[28px]';
			const height = hasTableTop || hasTableBottom ? 'h-[40px]' : 'h-[28px]';

			// Remove border-radius when connected to other tables
			const hasAnyConnection = hasTableTop || hasTableBottom || hasTableLeft || hasTableRight;
			const borderRadius = hasAnyConnection ? '0px' : '2px';

			// Build border classes for outer container - remove borders where tables connect
			const outerBorderClasses = [
				'border',
				'border-gray-300',
				hasTableTop ? 'border-t-0' : '',
				hasTableBottom ? 'border-b-0' : '',
				hasTableLeft ? 'border-l-0' : '',
				hasTableRight ? 'border-r-0' : '',
			].filter(Boolean).join(' ');

			return (
				<div
					key={`block-${row}-${col}`}
					className={`w-[40px] h-[40px] ${outerBorderClasses} flex items-center justify-center bg-white`}
					title={`${block.id} - table`}
				>
					<div
						className={`${width} ${height} bg-[#8B4513]`}
						style={{ borderRadius }}
					/>
				</div>
			);
		}

		if (block && block.type === 'walkway') {
			// Check neighboring blocks to merge walkways
			const topKey = `${row - 1}-${col}`;
			const bottomKey = `${row + 1}-${col}`;
			const leftKey = `${row}-${col - 1}`;
			const rightKey = `${row}-${col + 1}`;

			const hasWalkwayTop = blocksMap.get(topKey)?.type === 'walkway';
			const hasWalkwayBottom = blocksMap.get(bottomKey)?.type === 'walkway';
			const hasWalkwayLeft = blocksMap.get(leftKey)?.type === 'walkway';
			const hasWalkwayRight = blocksMap.get(rightKey)?.type === 'walkway';

			// Build border classes - remove borders where walkways connect
			const borderClasses = [
				'border-2',
				'border-[#0a2463]',
				hasWalkwayTop ? 'border-t-0' : '',
				hasWalkwayBottom ? 'border-b-0' : '',
				hasWalkwayLeft ? 'border-l-0' : '',
				hasWalkwayRight ? 'border-r-0' : '',
			].filter(Boolean).join(' ');

			return (
				<div
					key={`block-${row}-${col}`}
					className={`w-[40px] h-[40px] bg-white ${borderClasses}`}
					title={`${block.id} - walkway`}
				/>
			);
		}

		// Empty block - normal floor (beige color)
		return (
			<div
				key={`block-${row}-${col}`}
				className="w-[40px] h-[40px] bg-[#F5F5DC]"
			/>
		);
	};

	return (
		<main className="max-w-4xl mx-auto px-4 py-6 pb-24">
			{/* Back Button */}
			<button
				onClick={() => router.back()}
				className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4 transition-colors hover:cursor-pointer"
			>
				<ArrowLeft className="w-5 h-5" />
				<span className="font-medium">Kembali</span>
			</button>

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
						{/* Chess-like Grid: 16 columns × 17 rows */}
						<div className="overflow-x-auto">
							<div className="inline-block border-2 border-gray-900">
								{/* Render each row as a flex container */}
								{Array.from({ length: 17 }).map((_, rowIndex) => (
									<div key={`row-${rowIndex}`} className="flex">
										{Array.from({ length: 16 }).map((_, colIndex) => {
											const blocksMap = getBlocksMap('Zona AC 1');
											return renderGridBlock(rowIndex, colIndex, blocksMap);
										})}
									</div>
								))}
							</div>
						</div>
					</>
				)}

				{activeZone === 'zona-ac-2' && (
					<>
						<h3 className="text-lg font-bold text-gray-900 mb-4">Zona AC 2</h3>
						{/* Chess-like Grid: 16 columns × 17 rows */}
						<div className="overflow-x-auto">
							<div className="inline-block border-2 border-gray-900">
								{/* Render each row as a flex container */}
								{Array.from({ length: 17 }).map((_, rowIndex) => (
									<div key={`row-${rowIndex}`} className="flex">
										{Array.from({ length: 16 }).map((_, colIndex) => {
											const blocksMap = getBlocksMap('Zona AC 2');
											return renderGridBlock(rowIndex, colIndex, blocksMap);
										})}
									</div>
								))}
							</div>
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
							Kosong
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
		</main >
	);
}
