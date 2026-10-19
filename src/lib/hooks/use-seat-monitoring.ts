/**
 * useSeatMonitoring Hook
 * Custom hook for real-time seat monitoring
 */

import { useEffect, useState, useCallback } from "react";
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
	updateSeatStatus: (
		seatId: string,
		status: "available" | "used"
	) => Promise<void>;
	refreshCapacity: () => Promise<void>;
}

export function useSeatMonitoring(
	outletId: number,
	zoneName: string
): UseSeatMonitoringReturn {
	const [seats, setSeats] = useState<Block[]>([]);
	const [loading, setLoading] = useState(true);
	const [capacity, setCapacity] = useState({
		total: 0,
		used: 0,
		available: 0,
	});
	const [prevKey, setPrevKey] = useState(`${outletId}-${zoneName}`);

	const currentKey = `${outletId}-${zoneName}`;
	if (prevKey !== currentKey) {
		setPrevKey(currentKey);
		setLoading(true);
		setSeats([]);
		setCapacity({ total: 0, used: 0, available: 0 });
	}

	// Subscribe to real-time seat updates
	useEffect(() => {
		const unsubscribe = subscribeToOutletSeats(
			outletId,
			zoneName,
			(updatedSeats) => {
				setSeats(updatedSeats);
				const total = updatedSeats.length;
				const used = updatedSeats.filter(
					(seat) => seat.status === "used"
				).length;
				setCapacity({
					total,
					used,
					available: total - used,
				});
				setLoading(false);
			}
		);

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [outletId, zoneName]);

	// Fetch capacity statistics
	const refreshCapacity = useCallback(async () => {
		try {
			const stats = await getOutletCapacity(outletId, zoneName);
			setCapacity(stats);
		} catch (error) {
			console.error("Error refreshing capacity:", error);
		}
	}, [outletId, zoneName]);

	// Update seat status
	const updateSeatStatus = async (
		seatId: string,
		status: "available" | "used"
	) => {
		try {
			await updateSeatStatusService(outletId, zoneName, seatId, status);
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
