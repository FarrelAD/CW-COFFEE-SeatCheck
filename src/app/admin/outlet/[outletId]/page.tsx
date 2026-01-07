"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { canAccessOutlet } from "@/lib/services/admin-service";
import { getOutletById } from "@/lib/data/outlets";
import { getOutletLayout } from "@/lib/data/outlet-layouts";
import { useSeatMonitoring } from "@/lib/hooks/use-seat-monitoring";
import ZoneSelector from "./_components/ZoneSelector";
import AdminFloorPlan from "./_components/AdminFloorPlan";
import CapacityStats from "./_components/CapacityStats";

/**
 * Outlet Admin Page
 * Manages seats and monitors capacity for a specific outlet
 */
export default function OutletAdminPage() {
	const params = useParams();
	const router = useRouter();
	const { user } = useAuth();
	const outletId = parseInt(params.outletId as string);

	// Get outlet and layout data
	const outlet = getOutletById(outletId);
	const layout = outlet ? getOutletLayout(outlet.id) : null;

	// Available zones
	const availableZones = useMemo(() => {
		return layout ? layout.layout.map((area) => area.area) : [];
	}, [layout]);

	// Active zone state
	const [activeZone, setActiveZone] = useState("");

	// Set first zone as default
	useEffect(() => {
		if (availableZones.length > 0 && !activeZone) {
			setActiveZone(availableZones[0]);
		}
	}, [availableZones, activeZone]);

	// Real-time seat monitoring
	const { seats, loading, capacity, updateSeatStatus } = useSeatMonitoring(
		outletId,
		activeZone
	);

	// Merge Firebase seat data with layout structure
	const mergedLayout = useMemo(() => {
		if (!layout || seats.length === 0) return layout;

		// Create a copy of the layout
		const updatedLayout = { ...layout };
		const areaIndex = layout.layout.findIndex((a) => a.area === activeZone);

		if (areaIndex !== -1) {
			const areaLayout = layout.layout[areaIndex];

			// Only update if it's a grid layout
			if ("grid" in areaLayout && areaLayout.grid.length > 0) {
				// Create a map of seat statuses from Firebase
				const seatStatusMap = new Map(
					seats.map((seat) => [seat.id, seat.status])
				);

				// Update the layout with merged data
				updatedLayout.layout = [...layout.layout];
				updatedLayout.layout[areaIndex] = {
					...areaLayout,
					metadata: {
						...areaLayout.metadata,
						chairs: seats
							.filter((seat) => seat.type === "chair")
							.reduce(
								(acc, seat) => {
									acc[seat.id] = {
										status: seat.status,
										face: seat.face,
									};
									return acc;
								},
								{} as Record<string, { status?: any; face?: any }>
							),
					},
				};
			}
		}

		return updatedLayout;
	}, [layout, activeZone, seats]);

	// Check access permissions
	useEffect(() => {
		if (user && !canAccessOutlet(user, outletId)) {
			router.push("/admin?error=unauthorized");
		}
	}, [user, outletId, router]);

	// Handle seat click to toggle status
	const handleSeatClick = async (
		seatId: string,
		currentStatus: "available" | "used"
	) => {
		const newStatus = currentStatus === "available" ? "used" : "available";
		try {
			await updateSeatStatus(seatId, newStatus);
		} catch (error) {
			console.error("Failed to update seat:", error);
			alert("Failed to update seat status. Please try again.");
		}
	};

	// Loading state
	if (!outlet || !layout) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="text-center">
					<p className="text-gray-600">Outlet not found</p>
				</div>
			</div>
		);
	}

	// Unauthorized access
	if (user && !canAccessOutlet(user, outletId)) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-8">
				<div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
					<h2 className="text-2xl font-bold text-red-900 mb-2">
						Access Denied
					</h2>
					<p className="text-red-700">
						You don't have permission to access this outlet.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-6 pb-24">
			{/* Page Header */}
			<div className="mb-6">
				<h2 className="text-2xl md:text-3xl font-bold text-midnight-blue mb-1">
					{outlet.title}
				</h2>
				<p className="text-gray-600 text-sm">{outlet.address}</p>
			</div>

			{/* Zone Selector */}
			<div className="mb-6">
				<ZoneSelector
					zones={availableZones}
					activeZone={activeZone}
					onZoneChange={setActiveZone}
				/>
			</div>

			{/* Capacity Stats */}
			<div className="mb-6">
				<CapacityStats
					total={capacity.total}
					used={capacity.used}
					available={capacity.available}
				/>
			</div>

			{/* Floor Plan */}
			<div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
				<div className="mb-4">
					<h3 className="text-base md:text-lg font-bold text-midnight-blue">
						Floor Plan - {activeZone}
					</h3>
					<p className="text-xs md:text-sm text-gray-600 mt-1">
						Click on seats to toggle their status
					</p>
				</div>

				{loading ? (
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue mx-auto mb-4"></div>
						<p className="text-gray-600 text-sm">Loading floor plan...</p>
					</div>
				) : (
					<>
						<div className="flex justify-center overflow-x-auto">
							<AdminFloorPlan
								area={activeZone}
								layout={mergedLayout!}
								onSeatClick={handleSeatClick}
							/>
						</div>

						{/* Legend */}
						<div className="mt-6 pt-4 border-t-2 border-gray-900">
							<div className="flex flex-wrap gap-4 md:gap-8 justify-center">
								{/* Available */}
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 bg-gray-300 border-2 border-gray-900"></div>
									<span className="text-xs md:text-sm font-medium text-gray-700">
										Available
									</span>
								</div>

								{/* Used */}
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 bg-midnight-blue border-2 border-gray-900"></div>
									<span className="text-xs md:text-sm font-medium text-gray-700">
										Used
									</span>
								</div>

								{/* Table */}
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 bg-[#8B4513] border-2 border-gray-900"></div>
									<span className="text-xs md:text-sm font-medium text-gray-700">
										Table
									</span>
								</div>

								{/* Walkway */}
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 bg-white border-2 border-midnight-blue"></div>
									<span className="text-xs md:text-sm font-medium text-gray-700">
										Walkway
									</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
