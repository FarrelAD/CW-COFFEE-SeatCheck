"use client";

/**
 * Capacity Stats Component
 * Displays real-time capacity statistics
 */
export default function CapacityStats({
	total,
	used,
	available,
}: {
	total: number;
	used: number;
	available: number;
}) {
	const usedPercentage = total > 0 ? Math.round((used / total) * 100) : 0;

	return (
		<div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
			<h3 className="text-lg font-bold text-midnight-blue mb-4">
				Capacity Statistics
			</h3>

			<div className="grid grid-cols-3 gap-4">
				{/* Total */}
				<div className="text-center">
					<div className="text-3xl font-bold text-gray-900">{total}</div>
					<div className="text-sm text-gray-600 mt-1">Total Seats</div>
				</div>

				{/* Used */}
				<div className="text-center">
					<div className="text-3xl font-bold text-red-600">{used}</div>
					<div className="text-sm text-gray-600 mt-1">Used</div>
				</div>

				{/* Available */}
				<div className="text-center">
					<div className="text-3xl font-bold text-green-600">{available}</div>
					<div className="text-sm text-gray-600 mt-1">Available</div>
				</div>
			</div>

			{/* Progress Bar */}
			<div className="mt-6">
				<div className="flex justify-between text-sm text-gray-600 mb-2">
					<span>Occupancy</span>
					<span className="font-medium">{usedPercentage}%</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
					<div
						className="bg-midnight-blue h-full rounded-full transition-all duration-500"
						style={{ width: `${usedPercentage}%` }}
					/>
				</div>
			</div>
		</div>
	);
}
