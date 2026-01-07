/**
 * Firebase Data Seeding Utility
 * Initializes Firebase Realtime Database with seat data from Next.js layouts
 */

import { ref, set } from "firebase/database";
import { getFirebaseDatabase, DB_PATHS } from "../firebase/database";
import { getOutletLayout } from "../data/outlet-layouts";
import { parseGridLayout } from "../data/outlet-layouts";
import type { ZoneSeatData, SeatData } from "../types";

/**
 * Initialize all seats for a specific outlet zone
 */
export async function seedOutletZone(
	outletId: number,
	zoneName: string
): Promise<{ success: boolean; seatsCreated: number; error?: string }> {
	try {
		const layout = getOutletLayout(outletId);
		if (!layout) {
			return {
				success: false,
				seatsCreated: 0,
				error: `Layout not found for outlet ${outletId}`,
			};
		}

		// Find the specific zone
		const zoneLayout = layout.layout.find((area) => area.area === zoneName);
		if (!zoneLayout) {
			return {
				success: false,
				seatsCreated: 0,
				error: `Zone "${zoneName}" not found in outlet ${outletId}`,
			};
		}

		// Check if it's a grid layout
		if (!("grid" in zoneLayout) || !zoneLayout.grid.length) {
			return {
				success: false,
				seatsCreated: 0,
				error: `Zone "${zoneName}" has no grid data`,
			};
		}

		// Parse the grid layout to get blocks
		const blocks = parseGridLayout(zoneLayout);

		// Convert blocks to ZoneSeatData, filtering out undefined values
		const seatData: ZoneSeatData = {};
		blocks.forEach((block) => {
			const seat: SeatData = {
				type: block.type,
				status: block.status || "available",
				updatedAt: Date.now(),
			};

			// Only add face if it's defined (Firebase doesn't allow undefined)
			if (block.face !== undefined) {
				seat.face = block.face;
			}

			seatData[block.id] = seat;
		});

		// Write to Firebase
		const db = getFirebaseDatabase();
		const zoneRef = ref(db, DB_PATHS.zoneSeats(outletId, zoneName));
		await set(zoneRef, seatData);

		return {
			success: true,
			seatsCreated: Object.keys(seatData).length,
		};
	} catch (error) {
		return {
			success: false,
			seatsCreated: 0,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

/**
 * Initialize all zones for a specific outlet
 */
export async function seedOutlet(outletId: number): Promise<{
	success: boolean;
	zonesSeeded: number;
	totalSeats: number;
	zonesSkipped: number;
	errors: string[];
}> {
	const layout = getOutletLayout(outletId);
	if (!layout) {
		return {
			success: false,
			zonesSeeded: 0,
			totalSeats: 0,
			zonesSkipped: 0,
			errors: [`Layout not found for outlet ${outletId}`],
		};
	}

	const errors: string[] = [];
	let zonesSeeded = 0;
	let zonesSkipped = 0;
	let totalSeats = 0;

	for (const zoneLayout of layout.layout) {
		const zoneName = zoneLayout.area;
		const result = await seedOutletZone(outletId, zoneName);

		if (result.success) {
			zonesSeeded++;
			totalSeats += result.seatsCreated;
		} else if (result.error?.includes("has no grid data")) {
			// Skip zones without grid data (not an error)
			zonesSkipped++;
		} else if (result.error) {
			errors.push(`${zoneName}: ${result.error}`);
		}
	}

	return {
		success: zonesSeeded > 0,
		zonesSeeded,
		totalSeats,
		zonesSkipped,
		errors,
	};
}

/**
 * Initialize all outlets (use with caution!)
 */
export async function seedAllOutlets(): Promise<{
	success: boolean;
	outletsSeeded: number;
	totalZones: number;
	totalSeats: number;
	zonesSkipped: number;
	errors: Record<number, string[]>;
}> {
	// Currently only outlet 1 has layout data
	const outletIds = [1];

	let outletsSeeded = 0;
	let totalZones = 0;
	let totalSeats = 0;
	let zonesSkipped = 0;
	const errors: Record<number, string[]> = {};

	for (const outletId of outletIds) {
		const result = await seedOutlet(outletId);

		if (result.success) {
			outletsSeeded++;
			totalZones += result.zonesSeeded;
			totalSeats += result.totalSeats;
			zonesSkipped += result.zonesSkipped;
		}

		if (result.errors.length > 0) {
			errors[outletId] = result.errors;
		}
	}

	return {
		success: outletsSeeded > 0,
		outletsSeeded,
		totalZones,
		totalSeats,
		zonesSkipped,
		errors,
	};
}

/**
 * Clear all seat data for a zone (use with caution!)
 */
export async function clearZoneData(
	outletId: number,
	zoneName: string
): Promise<void> {
	const db = getFirebaseDatabase();
	const zoneRef = ref(db, DB_PATHS.zoneSeats(outletId, zoneName));
	await set(zoneRef, null);
}

/**
 * Clear all data for an outlet (use with caution!)
 */
export async function clearOutletData(outletId: number): Promise<void> {
	const db = getFirebaseDatabase();
	const outletRef = ref(db, DB_PATHS.outlet(outletId));
	await set(outletRef, null);
}
