/**
 * useSeatData Hook
 * React hook for subscribing to real-time seat data
 */

"use client";

import { useState, useEffect } from "react";
import { subscribeToZoneSeats } from "@/lib/services/seat-service";
import type { ZoneSeatData } from "@/lib/types";

/**
 * Subscribe to real-time seat data for a specific zone
 */
export function useSeatData(
	outletId: number,
	zoneName: string
): {
	seatData: ZoneSeatData | null;
	loading: boolean;
	error: Error | null;
} {
	const [seatData, setSeatData] = useState<ZoneSeatData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		try {
			const unsubscribe = subscribeToZoneSeats(outletId, zoneName, (data) => {
				setSeatData(data);
				setLoading(false);
			});

			// Cleanup subscription on unmount
			return () => {
				unsubscribe();
			};
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Unknown error"));
			setLoading(false);
		}
	}, [outletId, zoneName]);

	return { seatData, loading, error };
}
