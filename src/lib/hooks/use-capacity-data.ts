/**
 * useCapacityData Hook
 * React hook for subscribing to real-time capacity data
 */

"use client";

import { useState, useEffect } from "react";
import { subscribeToOutletCapacity } from "@/lib/services/seat-service";
import type { OutletCapacityData, ZoneCapacity } from "@/lib/types";

/**
 * Subscribe to real-time capacity data for an outlet
 */
export function useCapacityData(outletId: number): {
	capacityData: ZoneCapacity | null;
	loading: boolean;
	error: Error | null;
} {
	const [capacityData, setCapacityData] = useState<ZoneCapacity | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		try {
			const unsubscribe = subscribeToOutletCapacity(
				outletId,
				(data: OutletCapacityData | null) => {
					if (data) {
						setCapacityData(data.zones);
					} else {
						setCapacityData(null);
					}
					setLoading(false);
				}
			);

			// Cleanup subscription on unmount
			return () => {
				unsubscribe();
			};
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Unknown error"));
			setLoading(false);
		}
	}, [outletId]);

	return { capacityData, loading, error };
}
