/**
 * Real-time Data Types
 * Types for Firebase real-time database structures and capacity tracking
 */

import type { BlockStatus, BlockFace } from "./seat";

// ============================================================================
// Real-time Seat Data Types
// ============================================================================

export interface SeatStatus {
	status: BlockStatus;
	face?: BlockFace;
	updatedAt?: number; // timestamp
}

export interface ZoneSeatData {
	[seatId: string]: SeatStatus;
}

export interface OutletSeatData {
	[zoneName: string]: ZoneSeatData;
}

// ============================================================================
// Capacity Types
// ============================================================================

export interface CapacityInfo {
	total: number;
	used: number;
	available: number;
}

export interface ZoneCapacity {
	[zoneName: string]: CapacityInfo;
}

export interface OutletCapacityData {
	outletId: number;
	zones: ZoneCapacity;
	lastUpdated: number; // timestamp
}
