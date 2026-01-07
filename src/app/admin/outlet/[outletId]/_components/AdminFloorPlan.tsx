"use client";


import { Armchair } from "lucide-react";
import type { Block, OutletLayout } from "@/lib/types";
import { parseGridLayout } from "@/lib/data/outlet-layouts";

/**
 * Admin Floor Plan Component
 * Interactive floor plan with seat status editing
 * Styled to match the public floor plan design
 */
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
					Denah untuk zona ini sedang dalam pengembangan
				</p>
			</div>
		);
	}

	// Parse grid layout to get blocks
	const blocks = parseGridLayout(areaLayout);
	const { width, height } = areaLayout.dimensions;

	// Create a map for quick block lookup by position
	const blockMap = new Map<string, Block>();
	blocks.forEach((block) => {
		blockMap.set(block.id, block);
	});

	// Create a position-based map for neighbor checking
	const positionMap = new Map<string, Block>();
	blocks.forEach((block) => {
		// Convert block ID (e.g., "A1") to position
		const col = block.id.charCodeAt(0) - 65; // A=0, B=1, etc.
		const row = parseInt(block.id.substring(1)) - 1;
		positionMap.set(`${row}-${col}`, block);
	});

	// Helper to get block at position
	const getBlockAt = (row: number, col: number): Block | undefined => {
		return positionMap.get(`${row}-${col}`);
	};

	// Rotation map for chair icons (matching public floor plan)
	const rotationMap = {
		right: "rotate-270",
		down: "rotate-0",
		left: "rotate-90",
		up: "-rotate-180",
	};

	return (
		<>
			<h3 className="text-lg font-bold text-gray-900 mb-4 mr-4">{area}</h3>
			<div className="flex justify-center">
				<div className="overflow-x-auto max-w-full">
					<div className="inline-block border-2 border-gray-900">
						{Array.from({ length: height }).map((_, row) => (
							<div key={`row-${row}`} className="flex">
								{Array.from({ length: width }).map((_, col) => {
									const block = getBlockAt(row, col);

									// Chair block - Interactive
									if (block && block.type === "chair") {
										const isUsed = block.status === "used";
										const bgColor = isUsed ? "bg-[#0a2463]" : "bg-gray-300";
										const iconColor = isUsed ? "#ffffff" : "#0a2463";
										const rotationClass = block.face
											? rotationMap[block.face]
											: "rotate-0";

										return (
											<button
												key={`block-${row}-${col}`}
												onClick={() =>
													onSeatClick(
														block.id,
														block.status as "available" | "used"
													)
												}
												className={`w-[40px] h-[40px] border border-gray-300 flex items-center justify-center ${bgColor} hover:opacity-80 transition-opacity cursor-pointer`}
												title={`${block.id} - ${block.status} - Click to toggle`}
											>
												<Armchair
													className={`w-5 h-5 ${rotationClass}`}
													color={iconColor}
													fill={isUsed ? iconColor : "none"}
													strokeWidth={2}
												/>
											</button>
										);
									}

									// Table block
									if (block && block.type === "table") {
										// Check neighboring blocks to merge tables
										const topKey = `${row - 1}-${col}`;
										const bottomKey = `${row + 1}-${col}`;
										const leftKey = `${row}-${col - 1}`;
										const rightKey = `${row}-${col + 1}`;

										const hasTableTop =
											positionMap.get(topKey)?.type === "table";
										const hasTableBottom =
											positionMap.get(bottomKey)?.type === "table";
										const hasTableLeft =
											positionMap.get(leftKey)?.type === "table";
										const hasTableRight =
											positionMap.get(rightKey)?.type === "table";

										// Calculate width and height
										const innerWidth =
											hasTableLeft || hasTableRight ? "w-[40px]" : "w-[28px]";
										const innerHeight =
											hasTableTop || hasTableBottom ? "h-[40px]" : "h-[28px]";

										// Remove border-radius when connected
										const hasAnyConnection =
											hasTableTop ||
											hasTableBottom ||
											hasTableLeft ||
											hasTableRight;
										const borderRadius = hasAnyConnection ? "0px" : "2px";

										// Build border classes
										const outerBorderClasses = [
											"border",
											"border-gray-300",
											hasTableTop ? "border-t-0" : "",
											hasTableBottom ? "border-b-0" : "",
											hasTableLeft ? "border-l-0" : "",
											hasTableRight ? "border-r-0" : "",
										]
											.filter(Boolean)
											.join(" ");

										return (
											<div
												key={`block-${row}-${col}`}
												className={`w-[40px] h-[40px] ${outerBorderClasses} flex items-center justify-center bg-white`}
												title={`${block.id} - table`}
											>
												<div
													className={`${innerWidth} ${innerHeight} bg-[#8B4513]`}
													style={{ borderRadius }}
												/>
											</div>
										);
									}

									// Walkway block
									if (block && block.type === "walkway") {
										// Check neighboring blocks
										const topKey = `${row - 1}-${col}`;
										const bottomKey = `${row + 1}-${col}`;
										const leftKey = `${row}-${col - 1}`;
										const rightKey = `${row}-${col + 1}`;

										const hasWalkwayTop =
											positionMap.get(topKey)?.type === "walkway";
										const hasWalkwayBottom =
											positionMap.get(bottomKey)?.type === "walkway";
										const hasWalkwayLeft =
											positionMap.get(leftKey)?.type === "walkway";
										const hasWalkwayRight =
											positionMap.get(rightKey)?.type === "walkway";

										// Build border classes
										const borderClasses = [
											"border-2",
											"border-[#0a2463]",
											hasWalkwayTop ? "border-t-0" : "",
											hasWalkwayBottom ? "border-b-0" : "",
											hasWalkwayLeft ? "border-l-0" : "",
											hasWalkwayRight ? "border-r-0" : "",
										]
											.filter(Boolean)
											.join(" ");

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
								})}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
