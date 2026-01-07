/**
 * Seat & Layout Types
 * Types for seat management, blocks, and floor plan layouts
 */

// ============================================================================
// Block Types
// ============================================================================

export type BlockStatus = "available" | "used" | "reserved";
export type BlockType = "chair" | "table" | "walkway";
export type BlockFace = "right" | "left" | "down" | "up";

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
