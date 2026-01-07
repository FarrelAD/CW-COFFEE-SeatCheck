"use client";

import { useState, useMemo, useEffect } from "react";
import type { OutletLayout, Block } from "@/lib/types";
import { useSeatData } from "@/lib/hooks/use-seat-data";
import { parseGridLayout } from "@/lib/data/outlet-layouts";
import ZoneTabs from "./ZoneTabs";
import FloorPlanGrid from "./FloorPlanGrid";
import FloorPlanLegend from "./FloorPlanLegend";
import SeatStatus from "./SeatStatus";

export default function CheckingPageContent({
	layout,
}: {
	layout: OutletLayout;
}) {
	// Get available areas from layout
	const availableAreas = useMemo(() => {
		return layout.layout.map((area) => area.area);
	}, [layout]);

	// Set first area as default active zone
	const [activeZone, setActiveZone] = useState("");

	// Update active zone when areas are loaded
	useEffect(() => {
		if (availableAreas.length > 0 && !activeZone) {
			setActiveZone(availableAreas[0]);
		}
	}, [availableAreas, activeZone]);

	// Subscribe to real-time seat data from Firebase
	const { seatData, loading } = useSeatData(layout.id, activeZone);

	// Merge Firebase data with layout structure
	const mergedLayout = useMemo(() => {
		if (!seatData) return layout;

		// Create a copy of the layout
		const updatedLayout = { ...layout };
		const areaIndex = layout.layout.findIndex((a) => a.area === activeZone);

		if (areaIndex !== -1) {
			const areaLayout = layout.layout[areaIndex];

			// Only update if it's a grid layout
			if ("grid" in areaLayout && areaLayout.grid.length > 0) {
				const blocks = parseGridLayout(areaLayout);

				// Update block statuses from Firebase
				const updatedBlocks = blocks.map((block) => {
					const firebaseSeat = seatData[block.id];
					if (firebaseSeat) {
						return {
							...block,
							status: firebaseSeat.status,
							face: firebaseSeat.face || block.face,
						};
					}
					return block;
				});

				// Update the layout with merged data
				updatedLayout.layout = [...layout.layout];
				updatedLayout.layout[areaIndex] = {
					...areaLayout,
					metadata: {
						...areaLayout.metadata,
						chairs: updatedBlocks.reduce(
							(acc, block) => {
								if (block.type === "chair") {
									acc[block.id] = {
										status: block.status,
										face: block.face,
									};
								}
								return acc;
							},
							{} as Record<string, { status?: any; face?: any }>
						),
					},
				};
			}
		}

		return updatedLayout;
	}, [layout, activeZone, seatData]);

	// Calculate capacity from seat data
	const capacity = useMemo(() => {
		if (!seatData) return { total: 0, used: 0, available: 0 };

		const seats = Object.values(seatData).filter(
			(seat) => seat.type === "chair"
		);
		const total = seats.length;
		const used = seats.filter((seat) => seat.status === "used").length;
		const available = total - used;

		return { total, used, available };
	}, [seatData]);

	return (
		<>
			{/* Dynamic Zone Tabs */}
			<ZoneTabs
				zones={availableAreas}
				activeZone={activeZone}
				onZoneChange={setActiveZone}
			/>

			{/* Seat Status - Real-time from Firebase */}
			<SeatStatus available={capacity.available} used={capacity.used} />

			{/* Floor Plan */}
			<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
				{loading ? (
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-midnight-blue mx-auto mb-4"></div>
						<p className="text-gray-600">Loading floor plan...</p>
					</div>
				) : (
					<>
						<FloorPlanGrid area={activeZone} layout={mergedLayout} />
						<FloorPlanLegend />
					</>
				)}
			</div>
		</>
	);
}
