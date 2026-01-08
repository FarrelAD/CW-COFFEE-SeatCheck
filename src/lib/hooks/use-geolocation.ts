/**
 * useGeolocation Hook
 * React hook for accessing user location with caching and error handling
 */

"use client";

import { useState, useCallback } from "react";
import { getCurrentPosition } from "@/lib/services/geolocation-service";
import type { GeoCoordinates } from "@/lib/types";

interface UseGeolocationReturn {
	position: GeoCoordinates | null;
	error: string | null;
	loading: boolean;
	requestLocation: () => Promise<GeoCoordinates>;
	isSupported: boolean;
}

export function useGeolocation(): UseGeolocationReturn {
	const [position, setPosition] = useState<GeoCoordinates | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const isSupported =
		typeof navigator !== "undefined" && !!navigator.geolocation;

	const requestLocation = useCallback(async (): Promise<GeoCoordinates> => {
		setLoading(true);
		setError(null);

		try {
			const coords = await getCurrentPosition();
			setPosition(coords);
			setLoading(false);
			return coords;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error";
			setError(errorMessage);
			setLoading(false);
			throw err;
		}
	}, []);

	return {
		position,
		error,
		loading,
		requestLocation,
		isSupported,
	};
}
