'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Armchair } from 'lucide-react';
import { parseGridLayout } from '@/lib/data/outlet-layouts';
import { useCapacityData } from '@/lib/hooks/use-capacity-data';
import type { Block, OutletLayout } from '@/lib/types';

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
	layout,
}: {
	outletTitle: string;
	outletAddress: string;
	slug: string;
	outletId: number;
	layout: OutletLayout;
}) {
	const router = useRouter();

	// Get real-time capacity data from Firebase
	const { capacityData, loading: capacityLoading } = useCapacityData(outletId);

	// Get available areas from layout
	const availableAreas = useMemo(() => {
		return layout.layout.map((area) => area.area);
	}, [layout]);

	// Set first area as default active zone
	const [activeZone, setActiveZone] = useState('');

	// Update active zone when areas are loaded
	useEffect(() => {
		if (availableAreas.length > 0 && !activeZone) {
			setActiveZone(availableAreas[0]);
		}
	}, [availableAreas, activeZone]);

	/**
	 * Get dimensions for an area
	 */
	const getAreaDimensions = (areaName: string) => {
		const area = layout.layout.find((a) => a.area === areaName);
		if (!area) return { width: 16, height: 17 };

		// Check if it's a grid layout with dimensions
		if ('dimensions' in area) {
			return area.dimensions;
		}

		// Fallback for old format
		return { width: 16, height: 17 };
	};

	/**
	 * Create a map of coordinates to blocks for quick lookup
	 */
	const getBlocksMap = (areaName: string) => {
		const area = layout.layout.find((a) => a.area === areaName);
		if (!area) return new Map<string, Block>();

		// Check if it's a grid layout or traditional blocks layout
		const blocks = 'grid' in area ? parseGridLayout(area) : area.blocks;

		const blocksMap = new Map<string, Block>();
		blocks.forEach((block: Block) => {
			const coord = parseCoordinate(block.id);
			if (coord) {
				const key = `${coord.row}-${coord.col}`;
				blocksMap.set(key, block);
			}
		});

		return blocksMap;
	};

	/**
	 * Render a single grid block
	 * @param row 
	 * @param col 
	 * @param blocksMap 
	 * @returns 
	 */
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

			{/* Quick Stats - Real-time Capacity */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				{capacityLoading ? (
					<>
						<div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
							<div className="text-xl text-gray-400">Loading...</div>
						</div>
						<div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
							<div className="text-xl text-gray-400">Loading...</div>
						</div>
					</>
				) : (
					<>
						<div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
							<div className="text-3xl font-bold text-green-600 mb-1">
								{capacityData?.['Zona AC 1']?.available ?? 0}
							</div>
							<div className="text-xs text-gray-600">Tersedia AC 1</div>
						</div>
						<div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
							<div className="text-3xl font-bold text-green-600 mb-1">
								{capacityData?.['Zona AC 2']?.available ?? 0}
							</div>
							<div className="text-xs text-gray-600">Tersedia AC 2</div>
						</div>
					</>
				)}
			</div>

			{/* Dynamic Zone Tabs */}
			<div className="flex gap-3 mb-6 overflow-x-auto pb-2">
				{availableAreas.map((areaName, index) => (
					<button
						key={areaName}
						onClick={() => setActiveZone(areaName)}
						className={`px-6 py-2.5 font-bold rounded-lg whitespace-nowrap transition-colors ${activeZone === areaName
							? 'bg-[#0a2463] text-yellow-400'
							: 'bg-[#0a2463] text-white hover:bg-[#082050]'
							}`}
					>
						{areaName.toUpperCase()}
					</button>
				))}
			</div>

			{/* Floor Plan */}
			<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
				{(() => {
					const area = layout.layout.find((a) => a.area === activeZone);
					const hasGrid = area && 'grid' in area && area.grid.length > 0;

					if (!hasGrid) {
						return (
							<div className="text-center py-12">
								<p className="text-gray-500">Denah untuk zona ini sedang dalam pengembangan</p>
							</div>
						);
					}

					return (
						<>
							<h3 className="text-lg font-bold text-gray-900 mb-4">{activeZone}</h3>
							{/* Dynamic Grid based on area dimensions */}
							<div className="overflow-x-auto">
								<div className="inline-block border-2 border-gray-900">
									{(() => {
										const dimensions = getAreaDimensions(activeZone);
										const blocksMap = getBlocksMap(activeZone);
										return Array.from({ length: dimensions.height }).map((_, rowIndex) => (
											<div key={`row-${rowIndex}`} className="flex">
												{Array.from({ length: dimensions.width }).map((_, colIndex) => {
													return renderGridBlock(rowIndex, colIndex, blocksMap);
												})}
											</div>
										));
									})()}
								</div>
							</div>
						</>
					);
				})()}

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
