export default function CapacityLegend() {
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<div className="w-3 h-3 rounded-full bg-midnight-blue"></div>
				<span className="text-sm text-gray-700 font-medium">Terpakai</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="w-3 h-3 rounded-full bg-gray-300"></div>
				<span className="text-sm text-gray-700">Belum Terpakai</span>
			</div>
		</div>
	);
}
