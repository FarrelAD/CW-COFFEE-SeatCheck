/**
 * QR Code Utilities
 * Functions for generating and validating seat check-in QR codes
 */

import type { SeatQRData } from '@/lib/types';

/**
 * Generate QR data for a seat
 */
export function generateSeatQRData(
	outletId: number,
	outletName: string,
	zone: string,
	seatId: string
): SeatQRData {
	return {
		outletId,
		outletName,
		zone,
		seatId,
		type: 'seat-checkin',
		version: '1.0',
	};
}

/**
 * Generate QR data as JSON string
 */
export function generateSeatQRString(
	outletId: number,
	outletName: string,
	zone: string,
	seatId: string
): string {
	const data = generateSeatQRData(outletId, outletName, zone, seatId);
	return JSON.stringify(data);
}

/**
 * Validate QR data structure
 */
export function validateQRData(data: unknown): data is SeatQRData {
	if (!data || typeof data !== 'object') {
		return false;
	}

	const qr = data as Partial<SeatQRData>;

	return (
		typeof qr.outletId === 'number' &&
		typeof qr.outletName === 'string' &&
		typeof qr.zone === 'string' &&
		typeof qr.seatId === 'string' &&
		qr.type === 'seat-checkin' &&
		qr.version === '1.0'
	);
}

/**
 * Parse scanned QR code data
 */
export function parseSeatQRData(qrString: string): SeatQRData | null {
	try {
		const data = JSON.parse(qrString);

		if (!validateQRData(data)) {
			return null;
		}

		return data;
	} catch (error) {
		console.error('Failed to parse QR data:', error);
		return null;
	}
}

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
	return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
