import type { OutletLayout } from "@/lib/types";
import { getAreaDimensions, getBlocksMap } from "../_utils/grid-helpers";
import GridBlock from "./GridBlock";

export default function FloorPlanGrid({
	area,
	layout,
}: {
	area: string;
	layout: OutletLayout;
}) {
	const areaData = layout.layout.find((a) => a.area === area);
	const hasGrid = areaData && "grid" in areaData && areaData.grid.length > 0;

	if (!hasGrid) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-500">
					Denah untuk zona ini sedang dalam pengembangan
				</p>
			</div>
		);
	}

	const dimensions = getAreaDimensions(layout, area);
	const blocksMap = getBlocksMap(layout, area);

	return (
		<>
			<h3 className="text-lg font-bold text-gray-900 mb-4">{area}</h3>
			{/* Dynamic Grid based on area dimensions */}
			<div className="overflow-x-auto">
				<div className="inline-block border-2 border-gray-900">
					{Array.from({ length: dimensions.height }).map((_, rowIndex) => (
						<div key={`row-${rowIndex}`} className="flex">
							{Array.from({ length: dimensions.width }).map((_, colIndex) => {
								const key = `${rowIndex}-${colIndex}`;
								const block = blocksMap.get(key);
								return (
									<GridBlock
										key={`block-${rowIndex}-${colIndex}`}
										row={rowIndex}
										col={colIndex}
										block={block}
										blocksMap={blocksMap}
									/>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
