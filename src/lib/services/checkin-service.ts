/**
 * Check-in Service
 * Handles seat check-in/check-out operations with Firebase Realtime Database
 */

import { ref, set, update, get } from 'firebase/database';
import { getFirebaseDatabase, DB_PATHS } from '@/lib/firebase/database';
import { generateSessionId } from '@/lib/utils/qr-utils';
import type { SeatQRData, CheckInRecord, BlockStatus } from '@/lib/types';

/**
 * Check in a seat (mark as used)
 */
export async function checkInSeat(qrData: SeatQRData): Promise<CheckInRecord> {
	const db = getFirebaseDatabase();
	const { outletId, zone, seatId } = qrData;
	const sessionId = generateSessionId();
	const timestamp = Date.now();

	// Update seat status to 'used' with check-in metadata
	const seatRef = ref(db, DB_PATHS.seat(outletId, zone, seatId));
	await update(seatRef, {
		status: 'used' as BlockStatus,
		updatedAt: timestamp,
		checkedInAt: timestamp,
		sessionId,
	});

	// Create check-in record
	const checkInRecord: CheckInRecord = {
		seatId,
		zone,
		outletId,
		checkedInAt: timestamp,
		checkedOutAt: null,
		duration: null,
		sessionId,
	};

	const checkInRef = ref(db, DB_PATHS.checkin(outletId, sessionId));
	await set(checkInRef, checkInRecord);

	return checkInRecord;
}

/**
 * Check out a seat (mark as available)
 */
export async function checkOutSeat(
	outletId: number,
	zone: string,
	seatId: string,
	sessionId: string
): Promise<void> {
	const db = getFirebaseDatabase();
	const timestamp = Date.now();

	// Get check-in record to calculate duration
	const checkInRef = ref(db, DB_PATHS.checkin(outletId, sessionId));
	const snapshot = await get(checkInRef);
	const checkInData = snapshot.val() as CheckInRecord | null;

	if (!checkInData) {
		throw new Error('Check-in record not found');
	}

	const duration = timestamp - checkInData.checkedInAt;

	// Update seat status to 'available' and clear check-in metadata
	const seatRef = ref(db, DB_PATHS.seat(outletId, zone, seatId));
	await update(seatRef, {
		status: 'available' as BlockStatus,
		updatedAt: timestamp,
		checkedInAt: null,
		sessionId: null,
	});

	// Update check-in record
	await update(checkInRef, {
		checkedOutAt: timestamp,
		duration,
	});
}

/**
 * Get current seat status
 */
export async function getSeatStatus(
	outletId: number,
	zone: string,
	seatId: string
): Promise<{
	status: BlockStatus;
	sessionId?: string;
	checkedInAt?: number;
} | null> {
	const db = getFirebaseDatabase();
	const seatRef = ref(db, DB_PATHS.seat(outletId, zone, seatId));
	const snapshot = await get(seatRef);

	return snapshot.val();
}

/**
 * Validate if seat can be checked in
 */
export async function canCheckIn(
	outletId: number,
	zone: string,
	seatId: string
): Promise<{ canCheckIn: boolean; reason?: string }> {
	const status = await getSeatStatus(outletId, zone, seatId);

	if (!status) {
		return { canCheckIn: false, reason: 'Seat not found' };
	}

	if (status.status === 'used') {
		return { canCheckIn: false, reason: 'Seat is already occupied' };
	}

	return { canCheckIn: true };
}
