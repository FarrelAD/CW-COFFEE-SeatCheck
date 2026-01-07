"use client";

/**
 * Admin Floor Plan Component
 * Interactive floor plan with seat status editing
 */

import { Armchair, Square } from "lucide-react";
import type { Block, OutletLayout } from "@/lib/types";
import { parseGridLayout } from "@/lib/data/outlet-layouts";

export default function AdminFloorPlan({
	area,
	layout,
	onSeatClick,
}: {
	area: string;
	layout: OutletLayout;
	onSeatClick: (seatId: string, currentStatus: "available" | "used") => void;
}) {
	// Find the area layout
	const areaLayout = layout.layout.find((a) => a.area === area);

	if (!areaLayout) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-500">No layout data available for this area</p>
			</div>
		);
	}

	// Check if it's a GridAreaLayout (has dimensions and grid)
	if (!("dimensions" in areaLayout) || !("grid" in areaLayout)) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-500">
					This area uses a different layout format
				</p>
			</div>
		);
	}

	// Parse grid layout to get blocks
	const blocks = parseGridLayout(areaLayout);
	const { width, height } = areaLayout.dimensions;

	// Rotation map for chair icons
	const rotationMap = {
		up: "rotate-0",
		down: "rotate-180",
		left: "rotate-270",
		right: "rotate-90",
	};

	// Create a map for quick block lookup by position
	const blockMap = new Map<string, Block>();
	blocks.forEach((block) => {
		blockMap.set(block.id, block);
	});

	// Helper to get block at position
	const getBlockAt = (row: number, col: number): Block | null => {
		const colLetter = String.fromCharCode(65 + col);
		const rowNumber = row + 1;
		const id = `${colLetter}${rowNumber}`;
		return blockMap.get(id) || null;
	};

	return (
		<div className="overflow-x-auto">
			<div className="inline-flex flex-col gap-1 mx-auto">
				{Array.from({ length: height }).map((_, row) => (
					<div key={row} className="flex gap-1">
						{Array.from({ length: width }).map((_, col) => {
							const block = getBlockAt(row, col);

							// Empty floor
							if (!block) {
								return (
									<div
										key={`${row}-${col}`}
										className="w-8 h-8 bg-gray-100 rounded"
									/>
								);
							}

							// Walkway
							if (block.type === "walkway") {
								return (
									<div
										key={block.id}
										className="w-8 h-8 bg-gray-200 rounded"
										title="Walkway"
									/>
								);
							}

							// Table
							if (block.type === "table") {
								return (
									<div
										key={block.id}
										className="w-8 h-8 bg-amber-200 rounded flex items-center justify-center"
										title="Table"
									>
										<Square className="w-4 h-4 text-amber-700" />
									</div>
								);
							}

							// Chair - Interactive
							if (block.type === "chair") {
								const isUsed = block.status === "used";
								const rotation = rotationMap[block.face || "right"];

								return (
									<button
										key={block.id}
										onClick={() =>
											onSeatClick(
												block.id,
												block.status as "available" | "used"
											)
										}
										className={`w-8 h-8 rounded flex items-center justify-center transition-all hover:scale-110 hover:shadow-md cursor-pointer ${
											isUsed
												? "bg-red-500 hover:bg-red-600"
												: "bg-green-500 hover:bg-green-600"
										}`}
										title={`Seat ${block.id} - ${isUsed ? "Used" : "Available"} (Click to toggle)`}
									>
										<Armchair className={`w-5 h-5 text-white ${rotation}`} />
									</button>
								);
							}

							return null;
						})}
					</div>
				))}
			</div>
		</div>
	);
}
