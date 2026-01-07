/**
 * Seat & Layout Type Definitions
 * Comprehensive types for seat management and floor plans
 */

// ============================================================================
// Seat Status & Types
// ============================================================================

export type BlockStatus = "available" | "used" | "reserved";
export type BlockType = "chair" | "table" | "walkway";
export type BlockFace = "right" | "left" | "down" | "up";

/**
 * Block represents a single grid cell in the floor plan
 * Used for static layout definition
 */
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
// Firebase Seat Data (Real-time)
// ============================================================================

/**
 * SeatData represents the real-time state of a seat in Firebase
 * Includes all necessary information for display and management
 */
export interface SeatData {
	type: BlockType; // "chair" | "table" | "walkway"
	status: BlockStatus; // "available" | "used" | "reserved"
	face?: BlockFace; // Direction the seat faces
	updatedAt: number; // Last update timestamp

	// Check-in specific fields (only present when status="used")
	checkedInAt?: number;
	sessionId?: string;
}

/**
 * ZoneSeatData represents all seats in a specific zone
 */
export interface ZoneSeatData {
	[seatId: string]: SeatData;
}

/**
 * OutletSeatData represents all zones and their seats for an outlet
 */
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

// ============================================================================
// Legacy Types (for backward compatibility)
// ============================================================================

/**
 * @deprecated Use SeatData instead
 */
export interface SeatStatus {
	status: BlockStatus;
	face?: BlockFace;
	updatedAt?: number;
}
