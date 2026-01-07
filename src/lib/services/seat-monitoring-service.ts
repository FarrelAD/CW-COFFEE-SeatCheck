/**
 * Seat Monitoring Service
 * Handles real-time seat status updates and monitoring
 */

import { ref, onValue, update, get, type Unsubscribe } from "firebase/database";
import { getFirebaseDatabase } from "../firebase/database";
import type { Block } from "../types";

/**
 * Subscribe to real-time seat updates for an outlet
 */
export function subscribeToOutletSeats(
	outletId: number,
	area: string,
	callback: (seats: Block[]) => void
): Unsubscribe {
	const database = getFirebaseDatabase();
	const seatsRef = ref(database, `outlets/${outletId}/areas/${area}/seats`);

	return onValue(seatsRef, (snapshot) => {
		const data = snapshot.val();
		if (data) {
			// Convert object to array of blocks
			const seats: Block[] = Object.entries(data).map(([id, seatData]) => {
				const seat = seatData as Record<string, unknown>;
				return {
					id,
					type: seat.type as Block["type"],
					status: seat.status as Block["status"],
					face: seat.face as Block["face"],
				};
			});
			callback(seats);
		} else {
			callback([]);
		}
	});
}

/**
 * Update seat status
 */
export async function updateSeatStatus(
	outletId: number,
	area: string,
	seatId: string,
	status: "available" | "used"
): Promise<void> {
	const database = getFirebaseDatabase();
	const seatRef = ref(
		database,
		`outlets/${outletId}/areas/${area}/seats/${seatId}`
	);

	try {
		await update(seatRef, { status });
	} catch (error) {
		console.error("Error updating seat status:", error);
		throw error;
	}
}

/**
 * Get outlet capacity statistics for a specific area
 */
export async function getOutletCapacity(
	outletId: number,
	area: string
): Promise<{ total: number; used: number; available: number }> {
	const database = getFirebaseDatabase();
	const seatsRef = ref(database, `outlets/${outletId}/areas/${area}/seats`);

	try {
		const snapshot = await get(seatsRef);
		const data = snapshot.val();

		if (!data) {
			return { total: 0, used: 0, available: 0 };
		}

		const seats = Object.values(data) as Array<{ status?: string }>;
		const total = seats.length;
		const used = seats.filter((seat) => seat.status === "used").length;
		const available = total - used;

		return { total, used, available };
	} catch (error) {
		console.error("Error getting outlet capacity:", error);
		return { total: 0, used: 0, available: 0 };
	}
}

/**
 * Initialize seats for an outlet area from layout data
 */
export async function initializeSeatsFromLayout(
	outletId: number,
	area: string,
	blocks: Block[]
): Promise<void> {
	const database = getFirebaseDatabase();
	const seatsRef = ref(database, `outlets/${outletId}/areas/${area}/seats`);

	try {
		// Convert blocks array to object keyed by ID
		const seatsData: Record<string, unknown> = {};
		blocks.forEach((block) => {
			if (block.type === "chair") {
				seatsData[block.id] = {
					type: block.type,
					status: block.status || "available",
					face: block.face || "right",
				};
			}
		});

		await update(seatsRef, seatsData);
	} catch (error) {
		console.error("Error initializing seats:", error);
		throw error;
	}
}
