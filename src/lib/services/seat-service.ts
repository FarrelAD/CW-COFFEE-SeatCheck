/**
 * Seat Service Layer
 * Handles all real-time seat data operations with Firebase
 */

import {
	ref,
	onValue,
	set,
	update,
	get,
	type Unsubscribe,
	type DataSnapshot,
} from "firebase/database";
import { getFirebaseDatabase, DB_PATHS } from "@/lib/firebase/database";
import type {
	OutletSeatData,
	ZoneSeatData,
	SeatStatus,
	BlockStatus,
	OutletCapacityData,
	CapacityInfo,
} from "@/lib/types";

/**
 * Subscribe to all seat data for an outlet
 */
export function subscribeToOutletSeats(
	outletId: number,
	callback: (data: OutletSeatData | null) => void
): Unsubscribe {
	const db = getFirebaseDatabase();
	const seatsRef = ref(db, DB_PATHS.outletSeats(outletId));

	return onValue(seatsRef, (snapshot: DataSnapshot) => {
		const data = snapshot.val();
		callback(data);
	});
}

/**
 * Subscribe to seat data for a specific zone
 */
export function subscribeToZoneSeats(
	outletId: number,
	zoneName: string,
	callback: (data: ZoneSeatData | null) => void
): Unsubscribe {
	const db = getFirebaseDatabase();
	const zoneRef = ref(db, DB_PATHS.zoneSeats(outletId, zoneName));

	return onValue(zoneRef, (snapshot: DataSnapshot) => {
		const data = snapshot.val();
		callback(data);
	});
}

/**
 * Subscribe to capacity data for an outlet
 */
export function subscribeToOutletCapacity(
	outletId: number,
	callback: (data: OutletCapacityData | null) => void
): Unsubscribe {
	const db = getFirebaseDatabase();
	const capacityRef = ref(db, DB_PATHS.outletCapacity(outletId));

	return onValue(capacityRef, (snapshot: DataSnapshot) => {
		const data = snapshot.val();
		callback(data);
	});
}

/**
 * Update a single seat status
 * @param outletId - Outlet ID
 * @param zoneName - Zone name
 * @param seatId - Seat ID
 * @param status - New seat status
 */
export async function updateSeatStatus(
	outletId: number,
	zoneName: string,
	seatId: string,
	status: BlockStatus
): Promise<void> {
	const db = getFirebaseDatabase();
	const seatRef = ref(db, DB_PATHS.seat(outletId, zoneName, seatId));

	const seatData: SeatStatus = {
		status,
		updatedAt: Date.now(),
	};

	await set(seatRef, seatData);
}

/**
 * Update multiple seats at once
 */
export async function updateMultipleSeats(
	outletId: number,
	zoneName: string,
	updates: Record<string, BlockStatus>
): Promise<void> {
	const db = getFirebaseDatabase();
	const zoneRef = ref(db, DB_PATHS.zoneSeats(outletId, zoneName));

	const updateData: Record<string, SeatStatus> = {};
	Object.entries(updates).forEach(([seatId, status]) => {
		updateData[seatId] = {
			status,
			updatedAt: Date.now(),
		};
	});

	await update(zoneRef, updateData);
}

/**
 * Get seat data snapshot (one-time fetch)
 */
export async function getSeatSnapshot(
	outletId: number,
	zoneName?: string
): Promise<OutletSeatData | ZoneSeatData | null> {
	const db = getFirebaseDatabase();
	const path = zoneName
		? DB_PATHS.zoneSeats(outletId, zoneName)
		: DB_PATHS.outletSeats(outletId);

	const snapshot = await get(ref(db, path));
	return snapshot.val();
}

/**
 * Calculate capacity from seat data
 */
export function calculateCapacity(seatData: ZoneSeatData | null): CapacityInfo {
	if (!seatData) {
		return { total: 0, used: 0, available: 0 };
	}

	const seats = Object.values(seatData);
	const total = seats.length;
	const used = seats.filter((seat) => seat.status === "used").length;
	const available = total - used;

	return { total, used, available };
}

/**
 * Initialize seat data for a zone
 * (Used for seeding initial data)
 */
export async function initializeZoneSeats(
	outletId: number,
	zoneName: string,
	seatIds: string[]
): Promise<void> {
	const db = getFirebaseDatabase();
	const zoneRef = ref(db, DB_PATHS.zoneSeats(outletId, zoneName));

	const initialData: ZoneSeatData = {};
	seatIds.forEach((seatId) => {
		initialData[seatId] = {
			status: "available",
			updatedAt: Date.now(),
		};
	});

	await set(zoneRef, initialData);
}
