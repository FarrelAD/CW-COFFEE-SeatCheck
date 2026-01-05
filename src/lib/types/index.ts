/**
 * TypeScript Type Definitions for CW Coffee SeatCheck
 * Centralized type definitions for the entire application
 */

// ============================================================================
// Seat & Block Types
// ============================================================================

export type BlockStatus = 'available' | 'used' | 'reserved';
export type BlockType = 'chair' | 'table' | 'walkway';
export type BlockFace = 'right' | 'left' | 'down' | 'up';

export interface Block {
	id: string;
	type: BlockType;
	status?: BlockStatus;
	face?: BlockFace;
}

// ============================================================================
// Layout Types
// ============================================================================

export interface AreaDimensions {
	width: number;
	height: number;
}

export interface LayoutMetadata {
	chairs?: Record<string, { status?: BlockStatus; face?: BlockFace }>;
	tables?: Record<string, { status?: BlockStatus }>;
}

export interface GridAreaLayout {
	area: string;
	dimensions: AreaDimensions;
	grid: string[]; // Each string is a row, each character is a block
	metadata?: LayoutMetadata;
}

export interface AreaLayout {
	area: string;
	blocks: Block[];
}

export interface OutletLayout {
	id: number;
	layout: (AreaLayout | GridAreaLayout)[];
}

// ============================================================================
// Outlet Types
// ============================================================================

export interface Outlet {
	id: number;
	title: string;
	address: string;
	imageUrl: string;
	slug: string;
}

// ============================================================================
// Real-time Data Types (Firebase)
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
