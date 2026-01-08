/**
 * Outlet Types
 * Types for outlet/location information
 */

export interface Outlet {
	id: number;
	title: string;
	address: string;
	imageUrl: string;
	slug: string;
	coordinates?: {
		latitude: number;
		longitude: number;
	};
	checkInRadius?: number; // Radius in meters, defaults to 50m if not specified
}
