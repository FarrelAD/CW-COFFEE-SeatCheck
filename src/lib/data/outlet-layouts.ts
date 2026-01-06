/**
 * Outlet Layout Data Repository
 * Grid-based floor plan layouts for all outlets
 */

import type {
	Block,
	BlockType,
	GridAreaLayout,
	OutletLayout,
} from "@/lib/types";

/**
 * Parser function to convert grid layout to blocks
 */
export function parseGridLayout(gridLayout: GridAreaLayout): Block[] {
	const blocks: Block[] = [];
	const { grid, dimensions, metadata } = gridLayout;

	// Character to block type mapping
	const charMap: Record<string, BlockType | null> = {
		".": null, // Floor (empty)
		C: "chair", // Chair
		T: "table", // Table
		W: "walkway", // Walkway
	};

	// Process each row
	for (let row = 0; row < dimensions.height; row++) {
		const rowString = grid[row] || "";

		// Process each column in the row
		for (let col = 0; col < dimensions.width; col++) {
			const char = rowString[col] || ".";
			const blockType = charMap[char];

			if (blockType) {
				// Convert row/col to coordinate ID (e.g., 0,0 -> A1)
				const colLetter = String.fromCharCode(65 + col); // A, B, C, ...
				const rowNumber = row + 1;
				const id = `${colLetter}${rowNumber}`;

				// Create block with defaults
				const block: Block = {
					id,
					type: blockType,
				};

				// Apply defaults for chairs
				if (blockType === "chair") {
					block.status = "available";
					block.face = "right";
				}

				// Apply metadata overrides
				if (metadata?.chairs && metadata.chairs[id]) {
					const chairMeta = metadata.chairs[id];
					if (chairMeta.status) block.status = chairMeta.status;
					if (chairMeta.face) block.face = chairMeta.face;
				}

				blocks.push(block);
			}
		}
	}

	return blocks;
}

export const outletLayouts: OutletLayout[] = [
	{
		id: 1,
		layout: [
			{
				area: "Zona AC 1",
				dimensions: { width: 16, height: 17 },
				grid: [
					"C.WWWWWWWWWWWWWW", // Row 1
					"C.WCCCCWWCCCCWWW", // Row 2
					"C.WCCCCWWCCCCWWW", // Row 3
					"C.WCCCCWWCCCCWW.", // Row 4
					"C.WTTTTWWTTTTWW.", // Row 5
					"C.WCCCCWWCCCCWW.", // Row 6
					"WWWWWWWWWWWWWWW.", // Row 7
					"WWWWWWWWWWWWWWW.", // Row 8
					"C.WCCCCWWCC..WCC", // Row 9
					"C.WTTTTWWCCCCWCC", // Row 10
					"C.WCCCCWW..CCWCC", // Row 11
					"C.W....WWCCCCWCC", // Row 12
					"C.WCCCCWWCCCCWCC", // Row 13
					"C.WCCCCWW..CCWCC", // Row 14
					"C.WCCCCWWCCCCWCC", // Row 15
					"C.WCCCCWWCCCCWCC", // Row 16
					"..W....WW....W..", // Row 17
				],
				metadata: {
					chairs: {
						// Row 1 - all facing right (default)
						A2: { status: "used" },
						A3: { status: "used" },
						A4: { status: "used" },
						A6: { status: "used" },
						A13: { status: "used" },

						// Rows 4-7 - chairs around tables
						D2: { face: "down", status: "used" },
						D3: { face: "up", status: "used" },
						D4: { face: "down", status: "used" },
						D6: { face: "up", status: "used" },
						D9: { status: "used", face: "down" },
						D11: { face: "up" },
						D13: { face: "down" },
						D14: { face: "up" },
						D15: { face: "down" },
						D16: { face: "up" },

						E2: { face: "down" },
						E3: { status: "used", face: "up" },
						E4: { face: "down" },
						E6: { face: "up" },
						E9: { face: "down" },
						E11: { face: "up" },
						E13: { face: "down" },
						E14: { face: "up" },
						E15: { status: "used", face: "down" },
						E16: { face: "up" },

						F2: { face: "down" },
						F3: { face: "up" },
						F4: { face: "down" },
						F6: { status: "used", face: "up" },
						F9: { face: "down" },
						F11: { face: "up" },
						F13: { face: "down" },
						F14: { face: "up" },
						F15: { status: "used", face: "down" },
						F16: { face: "up" },

						G2: { face: "down" },
						G3: { face: "up" },
						G4: { face: "down" },
						G6: { face: "up" },
						G9: { face: "down" },
						G11: { status: "used", face: "up" },
						G13: { face: "down" },
						G14: { face: "up" },
						G15: { face: "down" },
						G16: { face: "up" },

						// Rows 10-14 - left side tables
						J2: { face: "down" },
						J3: { face: "up" },
						J4: { status: "used", face: "down" },
						J6: { status: "used", face: "up" },
						J9: { status: "used", face: "down" },
						J10: { face: "up" },
						J12: { face: "down" },
						J13: { face: "up" },
						J15: { face: "down" },
						J16: { face: "up" },

						K2: { face: "down" },
						K3: { face: "up" },
						K4: { status: "used", face: "down" },
						K6: { status: "used", face: "up" },
						K9: { status: "used", face: "down" },
						K10: { status: "used", face: "up" },
						K12: { status: "used", face: "down" },
						K13: { status: "used", face: "up" },
						K15: { face: "down" },
						K16: { face: "up" },

						L2: { face: "down" },
						L3: { face: "up" },
						L4: { status: "used", face: "down" },
						L6: { face: "up" },
						L10: { status: "used", face: "down" },
						L11: { status: "used", face: "up" },
						L12: { status: "used", face: "down" },
						L13: { face: "up" },
						L14: { status: "used", face: "down" },
						L15: { status: "used", face: "up" },
						L16: { face: "up" },

						M2: { face: "down" },
						M3: { status: "used", face: "up" },
						M4: { face: "down" },
						M6: { face: "up" },
						M10: { status: "used", face: "down" },
						M11: { face: "up" },
						M12: { face: "down" },
						M13: { face: "up" },
						M14: { face: "down" },
						M15: { status: "used", face: "up" },
						M16: { status: "used", face: "down" },

						// Rows 15-17 - bottom chairs
						O9: { status: "used", face: "down" },
						O10: { face: "up" },
						O11: { face: "down" },
						O12: { face: "up" },
						O13: { face: "down" },
						O14: { face: "up" },
						O15: { face: "down" },
						O16: { status: "used", face: "up" },
						P9: { face: "down" },
						P10: { status: "used", face: "up" },
						P11: { face: "down" },
						P12: { status: "used", face: "up" },
						P13: { face: "down" },
						P14: { status: "used", face: "up" },
						P15: { face: "down" },
						P16: { status: "used", face: "up" },
					},
				},
			},
			{
				area: "Zona AC 2",
				dimensions: { width: 16, height: 17 },
				grid: [],
				metadata: {
					chairs: {},
				},
			},
			{
				area: "Zona Outdoor 1",
				dimensions: { width: 16, height: 17 },
				grid: [],
				metadata: {
					chairs: {},
				},
			},
			{
				area: "Zona Outdoor 2",
				dimensions: { width: 16, height: 17 },
				grid: [],
				metadata: {
					chairs: {},
				},
			},
			{
				area: "Zona Outdoor 3",
				dimensions: { width: 16, height: 17 },
				grid: [],
				metadata: {
					chairs: {},
				},
			},
		],
	},
];

/**
 * Get layout by outlet ID
 */
export function getOutletLayout(outletId: number): OutletLayout | undefined {
	return outletLayouts.find((layout) => layout.id === outletId);
}

/**
 * Get all available zones for an outlet
 */
export function getOutletZones(outletId: number): string[] {
	const layout = getOutletLayout(outletId);
	if (!layout) return [];

	return layout.layout.map((area) => area.area);
}
