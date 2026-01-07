/**
 * Check-in Types
 * Types for QR code scanning and check-in flow
 */

// ============================================================================
// QR Code Types
// ============================================================================

export interface SeatQRData {
	outletId: number;
	outletName: string;
	zone: string;
	seatId: string;
	type: 'seat-checkin';
	version: '1.0';
}

// ============================================================================
// Check-in Record Types
// ============================================================================

export interface CheckInRecord {
	seatId: string;
	zone: string;
	outletId: number;
	checkedInAt: number;
	checkedOutAt: number | null;
	duration: number | null;
	sessionId: string;
}

export interface CheckInSession {
	sessionId: string;
	seatId: string;
	zone: string;
	checkedInAt: number;
	isActive: boolean;
}
