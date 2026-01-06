/**
 * Seed Data Utility
 * Script to populate Firebase Realtime Database with initial seat data
 */

import { ref, set } from "firebase/database";
import { getFirebaseDatabase } from "@/lib/firebase/database";
import { outlets } from "@/lib/data/outlets";
import { outletLayouts, parseGridLayout } from "@/lib/data/outlet-layouts";
import type {
	OutletSeatData,
	ZoneSeatData,
	SeatStatus,
	GridAreaLayout,
} from "@/lib/types";

/**
 * Generate random seat statuses for testing
 */
function randomizeSeatStatus(): "available" | "used" {
	return Math.random() > 0.3 ? "available" : "used";
}

/**
 * Seed seat data for a single outlet
 */
export async function seedOutletData(outletId: number): Promise<void> {
	console.log(`🌱 Seeding data for outlet ${outletId}...`);

	try {
		const db = getFirebaseDatabase();
		const layout = outletLayouts.find((l) => l.id === outletId);

		if (!layout) {
			console.warn(`⚠️  No layout found for outlet ${outletId}`);
			return;
		}

		const outletSeatData: OutletSeatData = {};

		// Process each zone
		for (const zoneLayout of layout.layout) {
			try {
				console.log(`  📋 Processing zone: ${zoneLayout.area}...`);
				const zoneName = zoneLayout.area;
				const zoneSeatData: ZoneSeatData = {};

				// Parse grid layout to get blocks
				const blocks = parseGridLayout(zoneLayout as GridAreaLayout);

				if (!blocks || blocks.length === 0) {
					console.warn(`  ⚠️  No blocks found for zone ${zoneName}`);
					continue;
				}

				// Create seat data for chairs only
				const chairs = blocks.filter((block) => block.type === "chair");
				console.log(`  🪑 Found ${chairs.length} chairs in ${zoneName}`);

				chairs.forEach((block) => {
					const seatStatus: SeatStatus = {
						status: block.status || randomizeSeatStatus(),
						face: block.face,
						updatedAt: Date.now(),
					};
					zoneSeatData[block.id] = seatStatus;
				});

				outletSeatData[zoneName] = zoneSeatData;
			} catch (zoneError) {
				console.error(`  ❌ Error processing zone ${zoneLayout.area}:`, zoneError);
				throw zoneError; // Re-throw to be caught by outer try-catch
			}
		}

		// Write to Firebase with timeout protection
		console.log(`  💾 Writing to Firebase...`);
		const seatsRef = ref(db, `outlets/${outletId}/seats`);

		// Add timeout wrapper to prevent hanging
		const writePromise = set(seatsRef, outletSeatData);
		const timeoutPromise = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Firebase write timeout after 30s')), 30000)
		);

		await Promise.race([writePromise, timeoutPromise]);

		console.log(`✅ Seeded data for outlet ${outletId}`);
	} catch (error) {
		console.error(`❌ Error seeding outlet ${outletId}:`, error);
		throw error; // Re-throw so the caller knows it failed
	}
}

/**
 * Seed all outlets
 */
export async function seedAllOutlets(): Promise<void> {
	console.log("🌱 Starting to seed Firebase with outlet data...");

	for (const outlet of outlets) {
		console.log(`🌱 Seeding data for outlet ${outlet.id}...`);
		try {
			await seedOutletData(outlet.id);
		} catch (error) {
			console.error(`❌ Error seeding outlet ${outlet.id}:`, error);
		}
	}

	console.log("✅ All outlets seeded successfully!");
}

/**
 * Clear all seat data (use with caution!)
 */
export async function clearAllSeatData(): Promise<void> {
	const db = getFirebaseDatabase();
	const outletsRef = ref(db, "outlets");
	await set(outletsRef, null);
	console.log("🗑️  All seat data cleared");
}

// Run this script manually to seed data
if (typeof window === "undefined") {
	// Only run in Node.js environment (not in browser)
	console.log("Run seedAllOutlets() to populate Firebase with initial data");
}
