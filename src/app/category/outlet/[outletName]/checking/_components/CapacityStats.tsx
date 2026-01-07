"use client";

import { useCapacityData } from "@/lib/hooks/use-capacity-data";

export default function CapacityStats({ outletId }: { outletId: number }) {
	const { capacityData, loading: capacityLoading } = useCapacityData(outletId);

	if (capacityLoading) {
		return (
			<>
				<div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
					<div className="text-xl text-gray-400">Loading...</div>
				</div>
				<div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
					<div className="text-xl text-gray-400">Loading...</div>
				</div>
			</>
		);
	}

	return (
		<>
			<div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
				<div className="text-3xl font-bold text-green-600 mb-1">
					{capacityData?.["Zona AC 1"]?.available ?? 0}
				</div>
				<div className="text-xs text-gray-600">Tersedia AC 1</div>
			</div>
			<div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
				<div className="text-3xl font-bold text-green-600 mb-1">
					{capacityData?.["Zona AC 2"]?.available ?? 0}
				</div>
				<div className="text-xs text-gray-600">Tersedia AC 2</div>
			</div>
		</>
	);
}
