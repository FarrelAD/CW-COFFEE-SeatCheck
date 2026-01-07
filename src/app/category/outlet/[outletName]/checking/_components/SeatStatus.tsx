export default function SeatStatus({
	available,
	used,
}: {
	available: number;
	used: number;
}) {
	const total = available + used;
	const usedPercentage = total > 0 ? (used / total) * 100 : 0;

	return (
		<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-6">
			{/* Header with Real-time Indicator */}
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-gray-900 font-bold text-lg">Status Kursi</h3>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
					<span className="text-xs text-gray-500">Real-time</span>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-2 gap-4">
				{/* Available Seats */}
				<div className="bg-green-50 rounded-xl p-4 border border-green-100">
					<div className="flex items-center gap-2 mb-2">
						<div className="w-3 h-3 bg-green-500 rounded-full"></div>
						<span className="text-sm text-gray-600">Tersedia</span>
					</div>
					<p className="text-3xl font-bold text-gray-900">{available}</p>
					<p className="text-xs text-gray-500 mt-1">kursi</p>
				</div>

				{/* Used Seats */}
				<div className="bg-red-50 rounded-xl p-4 border border-red-100">
					<div className="flex items-center gap-2 mb-2">
						<div className="w-3 h-3 bg-red-500 rounded-full"></div>
						<span className="text-sm text-gray-600">Terisi</span>
					</div>
					<p className="text-3xl font-bold text-gray-900">{used}</p>
					<p className="text-xs text-gray-500 mt-1">kursi</p>
				</div>
			</div>

			{/* Progress Bar */}
			<div className="mt-4">
				<div className="flex justify-between text-xs text-gray-600 mb-2">
					<span>Kapasitas</span>
					<span className="font-semibold">
						{used}/{total} ({usedPercentage.toFixed(0)}%)
					</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
					<div
						className="bg-midnight-blue h-full rounded-full transition-all duration-500"
						style={{ width: `${usedPercentage}%` }}
					></div>
				</div>
			</div>
		</div>
	);
}
