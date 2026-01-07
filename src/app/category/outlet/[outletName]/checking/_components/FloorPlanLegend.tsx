export default function FloorPlanLegend() {
	return (
		<div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t-2 border-gray-900">
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-gray-300 rounded"></div>
				<span className="text-sm font-medium text-gray-700">Tersedia</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-midnight-blue rounded"></div>
				<span className="text-sm font-medium text-gray-700">
					Terisi
				</span>
			</div>
		</div>
	);
}
