/**
 * Location Configuration
 * Centralized configuration for geolocation-based check-in validation
 */

export const LOCATION_CONFIG = {
	/** Default check-in radius in meters */
	DEFAULT_CHECK_IN_RADIUS: 50,

	/** GPS timeout in milliseconds */
	GPS_TIMEOUT: 10000, // 10 seconds

	/** Maximum age of cached GPS position in milliseconds */
	GPS_MAX_AGE: 60000, // 1 minute

	/** Enable high accuracy GPS */
	GPS_HIGH_ACCURACY: true,
} as const;

export const LOCATION_ERRORS = {
	PERMISSION_DENIED:
		"Location access is required to check in. Please enable location permissions in your browser settings.",
	POSITION_UNAVAILABLE:
		"Unable to determine your location. Please ensure GPS is enabled.",
	TIMEOUT: "Location request timed out. Please try again.",
	NOT_SUPPORTED: "Your browser doesn't support location services.",
	OUTSIDE_RADIUS:
		"You must be at the cafe to check in. Please scan the QR code when you arrive.",
	UNKNOWN: "An error occurred while getting your location. Please try again.",
} as const;
