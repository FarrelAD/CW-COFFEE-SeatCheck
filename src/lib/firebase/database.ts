/**
 * Firebase Realtime Database Configuration
 * Provides database instance and helper functions
 */

import { getDatabase, type Database } from "firebase/database";
import { getFirebaseApp } from "./app";

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
 * Unified path structure using "zones" terminology consistently
 */
export const DB_PATHS = {
	// Outlets root
	outlets: () => "outlets",

	// Specific outlet
	outlet: (outletId: number) => `outlets/${outletId}`,

	// All zones for an outlet
	outletZones: (outletId: number) => `outlets/${outletId}/zones`,

	// Specific zone
	zone: (outletId: number, zoneName: string) =>
		`outlets/${outletId}/zones/${zoneName}`,

	// All seats in a zone
	zoneSeats: (outletId: number, zoneName: string) =>
		`outlets/${outletId}/zones/${zoneName}/seats`,

	// Specific seat
	seat: (outletId: number, zoneName: string, seatId: string) =>
		`outlets/${outletId}/zones/${zoneName}/seats/${seatId}`,

	// Zone capacity
	zoneCapacity: (outletId: number, zoneName: string) =>
		`outlets/${outletId}/zones/${zoneName}/capacity`,

	// Check-ins root for outlet
	checkins: (outletId: number) => `outlets/${outletId}/checkins`,

	// Specific check-in record
	checkin: (outletId: number, sessionId: string) =>
		`outlets/${outletId}/checkins/${sessionId}`,
} as const;
