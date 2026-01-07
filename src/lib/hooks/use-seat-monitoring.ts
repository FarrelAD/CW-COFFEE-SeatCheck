/**
 * useSeatMonitoring Hook
 * Custom hook for real-time seat monitoring
 */

import { useEffect, useState } from "react";
import {
	subscribeToOutletSeats,
	updateSeatStatus as updateSeatStatusService,
	getOutletCapacity,
} from "../services/seat-monitoring-service";
import type { Block } from "../types";

interface UseSeatMonitoringReturn {
	seats: Block[];
	loading: boolean;
	capacity: { total: number; used: number; available: number };
	updateSeatStatus: (seatId: string, status: "available" | "used") => Promise<void>;
	refreshCapacity: () => Promise<void>;
}

export function useSeatMonitoring(
	outletId: number,
	area: string
): UseSeatMonitoringReturn {
	const [seats, setSeats] = useState<Block[]>([]);
	const [loading, setLoading] = useState(true);
	const [capacity, setCapacity] = useState({
		total: 0,
		used: 0,
		available: 0,
	});

	// Subscribe to real-time seat updates
	useEffect(() => {
		setLoading(true);

		const unsubscribe = subscribeToOutletSeats(outletId, area, (updatedSeats) => {
			setSeats(updatedSeats);
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [outletId, area]);

	// Fetch capacity statistics
	const refreshCapacity = async () => {
		try {
			const stats = await getOutletCapacity(outletId, area);
			setCapacity(stats);
		} catch (error) {
			console.error("Error refreshing capacity:", error);
		}
	};

	// Refresh capacity when seats change
	useEffect(() => {
		if (!loading) {
			refreshCapacity();
		}
	}, [seats, loading]);

	// Update seat status
	const updateSeatStatus = async (
		seatId: string,
		status: "available" | "used"
	) => {
		try {
			await updateSeatStatusService(outletId, area, seatId, status);
		} catch (error) {
			console.error("Error updating seat status:", error);
			throw error;
		}
	};

	return {
		seats,
		loading,
		capacity,
		updateSeatStatus,
		refreshCapacity,
	};
}
