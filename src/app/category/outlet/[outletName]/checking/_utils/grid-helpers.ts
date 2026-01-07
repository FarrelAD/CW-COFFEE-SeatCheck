import type { Block, OutletLayout } from "@/lib/types";
import { parseGridLayout } from "@/lib/data/outlet-layouts";

/**
 * Parse coordinate ID (e.g., "A1" -> {row: 0, col: 0})
 */
export const parseCoordinate = (
	id: string
): { row: number; col: number } | null => {
	const match = id.match(/^([A-P])(\d+)$/);
	if (!match) return null;

	const letter = match[1];
	const number = parseInt(match[2], 10);

	// A=0, B=1, C=2, ..., P=15 (columns)
	const col = letter.charCodeAt(0) - "A".charCodeAt(0);
	// 1=0, 2=1, 3=2, ... (rows)
	const row = number - 1;

	return { row, col };
};

/**
 * Get dimensions for an area
 */
export const getAreaDimensions = (
	layout: OutletLayout,
	areaName: string
): { width: number; height: number } => {
	const area = layout.layout.find((a) => a.area === areaName);
	if (!area) return { width: 16, height: 17 };

	// Check if it's a grid layout with dimensions
	if ("dimensions" in area) {
		return area.dimensions;
	}

	// Fallback for old format
	return { width: 16, height: 17 };
};

/**
 * Create a map of coordinates to blocks for quick lookup
 */
export const getBlocksMap = (
	layout: OutletLayout,
	areaName: string
): Map<string, Block> => {
	const area = layout.layout.find((a) => a.area === areaName);
	if (!area) return new Map<string, Block>();

	// Check if it's a grid layout or traditional blocks layout
	const blocks = "grid" in area ? parseGridLayout(area) : area.blocks;

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
