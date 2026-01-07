import { Armchair } from "lucide-react";
import type { Block } from "@/lib/types";

export default function GridBlock({
	row,
	col,
	block,
	blocksMap,
}: {
	row: number;
	col: number;
	block?: Block;
	blocksMap: Map<string, Block>;
}) {
	const key = `${row}-${col}`;

	if (block && block.type === "chair") {
		// Render chair with Armchair icon
		const bgColor = block.status === "used" ? "bg-[#0a2463]" : "bg-gray-300";
		const iconColor = block.status === "used" ? "#ffffff" : "#0a2463";

		// Determine rotation based on face direction
		// Default Armchair icon faces right, so we rotate from there
		const rotationMap = {
			right: "rotate-270", // 270° - faces right
			down: "rotate-0", // 0° - faces down
			left: "rotate-90", // 90° - faces left
			up: "-rotate-180", // 180° - faces up
		};

		const rotationClass = block.face ? rotationMap[block.face] : "rotate-0";

		return (
			<div
				key={`block-${row}-${col}`}
				className={`w-[40px] h-[40px] border border-gray-300 flex items-center justify-center ${bgColor}`}
				title={`${block.id} - ${block.status} - facing ${block.face}`}
			>
				<Armchair
					className={`w-5 h-5 ${rotationClass}`}
					color={iconColor}
					fill={block.status === "used" ? iconColor : "none"}
					strokeWidth={2}
				/>
			</div>
		);
	}

	if (block && block.type === "table") {
		// Check neighboring blocks to merge tables
		const topKey = `${row - 1}-${col}`;
		const bottomKey = `${row + 1}-${col}`;
		const leftKey = `${row}-${col - 1}`;
		const rightKey = `${row}-${col + 1}`;

		const hasTableTop = blocksMap.get(topKey)?.type === "table";
		const hasTableBottom = blocksMap.get(bottomKey)?.type === "table";
		const hasTableLeft = blocksMap.get(leftKey)?.type === "table";
		const hasTableRight = blocksMap.get(rightKey)?.type === "table";

		// Calculate width and height - extend to 40px when adjacent tables exist
		const width = hasTableLeft || hasTableRight ? "w-[40px]" : "w-[28px]";
		const height = hasTableTop || hasTableBottom ? "h-[40px]" : "h-[28px]";

		// Remove border-radius when connected to other tables
		const hasAnyConnection =
			hasTableTop || hasTableBottom || hasTableLeft || hasTableRight;
		const borderRadius = hasAnyConnection ? "0px" : "2px";

		// Build border classes for outer container - remove borders where tables connect
		const outerBorderClasses = [
			"border",
			"border-gray-300",
			hasTableTop ? "border-t-0" : "",
			hasTableBottom ? "border-b-0" : "",
			hasTableLeft ? "border-l-0" : "",
			hasTableRight ? "border-r-0" : "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<div
				key={`block-${row}-${col}`}
				className={`w-[40px] h-[40px] ${outerBorderClasses} flex items-center justify-center bg-white`}
				title={`${block.id} - table`}
			>
				<div
					className={`${width} ${height} bg-[#8B4513]`}
					style={{ borderRadius }}
				/>
			</div>
		);
	}

	if (block && block.type === "walkway") {
		// Check neighboring blocks to merge walkways
		const topKey = `${row - 1}-${col}`;
		const bottomKey = `${row + 1}-${col}`;
		const leftKey = `${row}-${col - 1}`;
		const rightKey = `${row}-${col + 1}`;

		const hasWalkwayTop = blocksMap.get(topKey)?.type === "walkway";
		const hasWalkwayBottom = blocksMap.get(bottomKey)?.type === "walkway";
		const hasWalkwayLeft = blocksMap.get(leftKey)?.type === "walkway";
		const hasWalkwayRight = blocksMap.get(rightKey)?.type === "walkway";

		// Build border classes - remove borders where walkways connect
		const borderClasses = [
			"border-2",
			"border-[#0a2463]",
			hasWalkwayTop ? "border-t-0" : "",
			hasWalkwayBottom ? "border-b-0" : "",
			hasWalkwayLeft ? "border-l-0" : "",
			hasWalkwayRight ? "border-r-0" : "",
		]
			.filter(Boolean)
			.join(" ");

		return (
			<div
				key={`block-${row}-${col}`}
				className={`w-[40px] h-[40px] bg-white ${borderClasses}`}
				title={`${block.id} - walkway`}
			/>
		);
	}

	// Empty block - normal floor (beige color)
	return (
		<div
			key={`block-${row}-${col}`}
			className="w-[40px] h-[40px] bg-[#F5F5DC]"
		/>
	);
}
