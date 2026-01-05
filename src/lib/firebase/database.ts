/**
 * Firebase Realtime Database Configuration
 * Provides database instance and helper functions
 */

import { getDatabase, type Database } from 'firebase/database';
import { getFirebaseApp } from './app';

let database: Database | null = null;

/**
 * Get Firebase Realtime Database instance
 */
export function getFirebaseDatabase(): Database {
	if (!database) {
		const app = getFirebaseApp();
		database = getDatabase(app);
	}
	return database;
}

/**
 * Database path helpers
 */
export const DB_PATHS = {
	// Outlets root
	outlets: () => 'outlets',

	// Specific outlet
	outlet: (outletId: number) => `outlets/${outletId}`,

	// Seat data for an outlet
	outletSeats: (outletId: number) => `outlets/${outletId}/seats`,

	// Specific zone seats
	zoneSeats: (outletId: number, zoneName: string) =>
		`outlets/${outletId}/seats/${zoneName}`,

	// Specific seat
	seat: (outletId: number, zoneName: string, seatId: string) =>
		`outlets/${outletId}/seats/${zoneName}/${seatId}`,

	// Capacity data for an outlet
	outletCapacity: (outletId: number) => `outlets/${outletId}/capacity`,

	// Specific zone capacity
	zoneCapacity: (outletId: number, zoneName: string) =>
		`outlets/${outletId}/capacity/${zoneName}`,
} as const;
