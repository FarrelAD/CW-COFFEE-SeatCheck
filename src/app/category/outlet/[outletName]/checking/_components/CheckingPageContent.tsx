"use client";

import { useState, useMemo, useEffect } from "react";
import type { OutletLayout } from "@/lib/types";
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

	return (
		<>
			{/* Dynamic Zone Tabs */}
			<ZoneTabs
				zones={availableAreas}
				activeZone={activeZone}
				onZoneChange={setActiveZone}
			/>

			{/* Seat Status - Real-time */}
			<SeatStatus available={50} used={30} />

			{/* Floor Plan */}
			<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
				<FloorPlanGrid area={activeZone} layout={layout} />
				<FloorPlanLegend />
			</div>
		</>
	);
}
