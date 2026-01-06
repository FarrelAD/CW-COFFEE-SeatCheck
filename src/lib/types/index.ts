/**
 * TypeScript Type Definitions for CW Coffee SeatCheck
 * Centralized type definitions for the entire application
 */

// ============================================================================
// News Types
// ============================================================================

export interface NewsItem {
	id: number;
	imageUrl: string;
	title: string;
	excerpt: string;
	link: string;
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
// Product Types
// ============================================================================

export interface Product {
	id: number;
	imageUrl: string;
	title: string;
	link?: string;
}

export interface ProductCategory {
	name: string;
	products: Product[];
}

// ============================================================================
// Promo Types
// ============================================================================

export interface PromoSlide {
	id: number;
	imageUrl: string;
	alt: string;
	link?: string;
}

// ============================================================================
// Seat & Block Types
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

export interface CapacityCardProps {
	zoneName: string;
	capacity: CapacityInfo;
}

// ============================================================================
// QR Code & Check-in Types
// ============================================================================

export interface SeatQRData {
	outletId: number;
	outletName: string;
	zone: string;
	seatId: string;
	type: 'seat-checkin';
	version: '1.0';
}

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

export interface ZoneCapacity {
	[zoneName: string]: CapacityInfo;
}

export interface OutletCapacityData {
	outletId: number;
	zones: ZoneCapacity;
	lastUpdated: number; // timestamp
}
