/**
 * Geolocation Service
 * Core utilities for location access and validation
 */

import { LOCATION_CONFIG, LOCATION_ERRORS } from "@/lib/config/location-config";
import type { GeoCoordinates } from "@/lib/types";

/**
 * Get user's current position
 */
export async function getCurrentPosition(): Promise<GeoCoordinates> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error(LOCATION_ERRORS.NOT_SUPPORTED));
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy,
					timestamp: position.timestamp,
				});
			},
			(error) => {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						reject(new Error(LOCATION_ERRORS.PERMISSION_DENIED));
						break;
					case error.POSITION_UNAVAILABLE:
						reject(new Error(LOCATION_ERRORS.POSITION_UNAVAILABLE));
						break;
					case error.TIMEOUT:
						reject(new Error(LOCATION_ERRORS.TIMEOUT));
						break;
					default:
						reject(new Error(LOCATION_ERRORS.UNKNOWN));
				}
			},
			{
				enableHighAccuracy: LOCATION_CONFIG.GPS_HIGH_ACCURACY,
				timeout: LOCATION_CONFIG.GPS_TIMEOUT,
				maximumAge: LOCATION_CONFIG.GPS_MAX_AGE,
			}
		);
	});
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns Distance in meters
 */
export function calculateDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number {
	const R = 6371e3; // Earth's radius in meters
	const φ1 = (lat1 * Math.PI) / 180;
	const φ2 = (lat2 * Math.PI) / 180;
	const Δφ = ((lat2 - lat1) * Math.PI) / 180;
	const Δλ = ((lon2 - lon1) * Math.PI) / 180;

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // Distance in meters
}

/**
 * Check if user is within allowed radius of target location
 */
export function isWithinRadius(
	userLat: number,
	userLon: number,
	targetLat: number,
	targetLon: number,
	radiusMeters: number = LOCATION_CONFIG.DEFAULT_CHECK_IN_RADIUS
): boolean {
	const distance = calculateDistance(userLat, userLon, targetLat, targetLon);
	return distance <= radiusMeters;
}

/**
 * Validate if user location is within outlet's check-in radius
 */
export function validateLocationForOutlet(
	userLocation: GeoCoordinates,
	outletCoordinates: { latitude: number; longitude: number },
	radiusMeters?: number
): { valid: boolean; distance: number; error?: string } {
	const distance = calculateDistance(
		userLocation.latitude,
		userLocation.longitude,
		outletCoordinates.latitude,
		outletCoordinates.longitude
	);

	const radius = radiusMeters ?? LOCATION_CONFIG.DEFAULT_CHECK_IN_RADIUS;
	const valid = distance <= radius;

	return {
		valid,
		distance,
		error: valid ? undefined : LOCATION_ERRORS.OUTSIDE_RADIUS,
	};
}
