import CapacityCircle from "./CapacityCircle";
import CapacityLegend from "./CapacityLegend";

export default function CapacityCard({
	zoneName,
	used,
	total,
}: {
	zoneName: string;
	used: number;
	total: number;
}) {
	return (
		<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
			<h3 className="text-gray-900 font-bold text-lg mb-1">{zoneName}</h3>

			{/* Circular Progress */}
			<CapacityCircle used={used} total={total} />

			{/* Legend */}
			<CapacityLegend />
		</div>
	);
}
