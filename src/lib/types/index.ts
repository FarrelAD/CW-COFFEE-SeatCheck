/**
 * TypeScript Type Definitions for CW Coffee SeatCheck
 * Centralized barrel export for all type definitions
 *
 * This file re-exports types from domain-specific modules for convenience.
 * You can import from this file or directly from specific modules:
 *
 * @example
 * // Import from barrel (recommended for backward compatibility)
 * import { Block, CheckInRecord, NewsItem } from '@/lib/types';
 *
 * // Import from specific modules (better for tree-shaking)
 * import { Block } from '@/lib/types/seat';
 * import { CheckInRecord } from '@/lib/types/checkin';
 * import { NewsItem } from '@/lib/types/content';
 */

// ============================================================================
// Admin & Authentication Types
// ============================================================================
export type { AdminRole, AdminUser } from "./admin";

// ============================================================================
// Content Types (News, Products, Promos)
// ============================================================================
export type { NewsItem, Product, ProductCategory, PromoSlide } from "./content";

// ============================================================================
// Outlet Types
// ============================================================================
export type { Outlet } from "./outlet";

// ============================================================================
// Seat & Layout Types
// ============================================================================
export type {
	BlockStatus,
	BlockType,
	BlockFace,
	Block,
	AreaDimensions,
	LayoutMetadata,
	GridAreaLayout,
	AreaLayout,
	OutletLayout,
	SeatData,
	ZoneSeatData,
	OutletSeatData,
	CapacityInfo,
	ZoneCapacity,
	OutletCapacityData,
} from "./seat";

// ============================================================================
// Check-in Types
// ============================================================================
export type {
	SeatQRData,
	CheckInRecord,
	CheckInSession,
	GeoCoordinates,
} from "./checkin";

// ============================================================================
// Real-time Data Types (Firebase) - Legacy, use seat.ts types instead
// ============================================================================
export type { SeatStatus } from "./seat";
