/**
 * Seat Monitoring Service
 * Handles real-time seat status updates and monitoring
 */

import { ref, onValue, update, get, type Unsubscribe } from "firebase/database";
import { getFirebaseDatabase, DB_PATHS } from "../firebase/database";
import type { Block, SeatData, ZoneSeatData } from "../types";

/**
 * Subscribe to real-time seat updates for an outlet zone
 */
export function subscribeToOutletSeats(
	outletId: number,
	zoneName: string,
	callback: (seats: Block[]) => void
): Unsubscribe {
	const database = getFirebaseDatabase();
	const seatsRef = ref(database, DB_PATHS.zoneSeats(outletId, zoneName));

	return onValue(seatsRef, (snapshot) => {
		const data = snapshot.val() as ZoneSeatData | null;
		if (data) {
			// Convert ZoneSeatData to Block array
			const seats: Block[] = Object.entries(data).map(([id, seatData]) => ({
				id,
				type: seatData.type,
				status: seatData.status,
				face: seatData.face,
			}));
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
	zoneName: string,
	seatId: string,
	status: "available" | "used"
): Promise<void> {
	const database = getFirebaseDatabase();
	const seatRef = ref(database, DB_PATHS.seat(outletId, zoneName, seatId));

	try {
		await update(seatRef, { status, updatedAt: Date.now() });
	} catch (error) {
		console.error("Error updating seat status:", error);
		throw error;
	}
}

/**
 * Get outlet capacity statistics for a specific zone
 */
export async function getOutletCapacity(
	outletId: number,
	zoneName: string
): Promise<{ total: number; used: number; available: number }> {
	const database = getFirebaseDatabase();
	const seatsRef = ref(database, DB_PATHS.zoneSeats(outletId, zoneName));

	try {
		const snapshot = await get(seatsRef);
		const data = snapshot.val() as ZoneSeatData | null;

		if (!data) {
			return { total: 0, used: 0, available: 0 };
		}

		const seats = Object.values(data);
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
 * Initialize seats for an outlet zone from layout data
 */
export async function initializeSeatsFromLayout(
	outletId: number,
	zoneName: string,
	blocks: Block[]
): Promise<void> {
	const database = getFirebaseDatabase();
	const seatsRef = ref(database, DB_PATHS.zoneSeats(outletId, zoneName));

	try {
		// Convert blocks array to ZoneSeatData object
		const seatsData: ZoneSeatData = {};
		blocks.forEach((block) => {
			const seatData: SeatData = {
				type: block.type,
				status: block.status || "available",
				face: block.face,
				updatedAt: Date.now(),
			};
			seatsData[block.id] = seatData;
		});

		await update(seatsRef, seatsData);
	} catch (error) {
		console.error("Error initializing seats:", error);
		throw error;
	}
}
