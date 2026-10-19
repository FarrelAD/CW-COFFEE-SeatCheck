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
	const [prevKey, setPrevKey] = useState(`${outletId}-${zoneName}`);

	const currentKey = `${outletId}-${zoneName}`;
	if (prevKey !== currentKey) {
		setPrevKey(currentKey);
		setLoading(true);
		setError(null);
		setSeatData(null);
	}

	useEffect(() => {
		const unsubscribe = subscribeToZoneSeats(
			outletId,
			zoneName,
			(data) => {
				setSeatData(data);
				setLoading(false);
			},
			(err) => {
				setError(err);
				setLoading(false);
			}
		);

		// Cleanup subscription on unmount
		return () => {
			unsubscribe();
		};
	}, [outletId, zoneName]);

	return { seatData, loading, error };
}
