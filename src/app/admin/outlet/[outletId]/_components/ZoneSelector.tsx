"use client";

/**
 * Zone Selector Component for Admin
 * Displays zone tabs for outlet areas
 */
export default function ZoneSelector({
	zones,
	activeZone,
	onZoneChange,
}: {
	zones: string[];
	activeZone: string;
	onZoneChange: (zone: string) => void;
}) {
	return (
		<div className="flex gap-2 overflow-x-auto pb-2">
			{zones.map((zone) => (
				<button
					key={zone}
					onClick={() => onZoneChange(zone)}
					className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
						activeZone === zone
							? "bg-midnight-blue text-white shadow-md"
							: "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
					}`}
				>
					{zone}
				</button>
			))}
		</div>
	);
}
