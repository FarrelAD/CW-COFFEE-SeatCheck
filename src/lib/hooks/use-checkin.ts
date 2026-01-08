/**
 * useCheckIn Hook
 * React hook for seat check-in operations
 */

"use client";

import { useState } from "react";
import { checkInSeat, canCheckIn } from "@/lib/services/checkin-service";
import type { SeatQRData, CheckInRecord, GeoCoordinates } from "@/lib/types";

/**
 * Hook for handling seat check-ins
 */
export function useCheckIn(): {
	checkIn: (
		qrData: SeatQRData,
		checkInLocation?: GeoCoordinates
	) => Promise<CheckInRecord>;
	loading: boolean;
	error: string | null;
	success: boolean;
	reset: () => void;
} {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const checkIn = async (
		qrData: SeatQRData,
		checkInLocation?: GeoCoordinates
	): Promise<CheckInRecord> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			// Validate if seat can be checked in
			const validation = await canCheckIn(
				qrData.outletId,
				qrData.zone,
				qrData.seatId
			);

			if (!validation.canCheckIn) {
				throw new Error(validation.reason || "Cannot check in to this seat");
			}

			// Perform check-in with location data
			const record = await checkInSeat(qrData, checkInLocation);
			setSuccess(true);
			setLoading(false);

			return record;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to check in";
			setError(errorMessage);
			setLoading(false);
			throw err;
		}
	};

	const reset = () => {
		setLoading(false);
		setError(null);
		setSuccess(false);
	};

	return {
		checkIn,
		loading,
		error,
		success,
		reset,
	};
}
