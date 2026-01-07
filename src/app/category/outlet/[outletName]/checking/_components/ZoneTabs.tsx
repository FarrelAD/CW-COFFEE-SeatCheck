"use client";

export default function ZoneTabs({
	zones,
	activeZone,
	onZoneChange,
}: {
	zones: string[];
	activeZone: string;
	onZoneChange: (zone: string) => void;
}) {
	return (
		<div className="flex gap-3 mb-6 overflow-x-auto pb-2">
			{zones.map((areaName) => (
				<button
					key={areaName}
					onClick={() => onZoneChange(areaName)}
					className={`px-6 py-2.5 font-bold rounded-lg whitespace-nowrap transition-colors ${
						activeZone === areaName
							? "bg-midnight-blue text-yellow-400"
							: "bg-midnight-blue text-white hover:bg-[#082050]"
					}`}
				>
					{areaName.toUpperCase()}
				</button>
			))}
		</div>
	);
}
