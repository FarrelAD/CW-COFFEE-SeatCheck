export default function FloorPlanLegend() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 pt-6 border-t-2 border-gray-900">
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-gray-300 border border-gray-300"></div>
				<span className="text-sm font-medium text-gray-700">Tersedia</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-midnight-blue border border-gray-300"></div>
				<span className="text-sm font-medium text-gray-700">Terisi</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-[#8B4513] border border-gray-300"></div>
				<span className="text-sm font-medium text-gray-700">Meja</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-white border-2 border-midnight-blue"></div>
				<span className="text-sm font-medium text-gray-700">Jalan</span>
			</div>
		</div>
	);
}
