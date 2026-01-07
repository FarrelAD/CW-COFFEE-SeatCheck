export default function CapacityCircle({
	used,
	total,
}: {
	used: number;
	total: number;
}) {
	// Calculate the stroke dasharray for the progress circle
	// Circle circumference = 2 * π * r = 2 * π * 56 ≈ 352
	const circumference = 352;
	const percentage = total > 0 ? used / total : 0;
	const strokeDasharray = `${percentage * circumference} ${circumference}`;

	return (
		<div className="relative w-32 h-32 mx-auto mb-4">
			<svg className="w-full h-full transform -rotate-90">
				{/* Background Circle */}
				<circle
					cx="64"
					cy="64"
					r="56"
					stroke="#E5E7EB"
					strokeWidth="12"
					fill="none"
				/>
				{/* Progress Circle */}
				<circle
					cx="64"
					cy="64"
					r="56"
					stroke="#0a2463"
					strokeWidth="12"
					fill="none"
					strokeDasharray={strokeDasharray}
					strokeLinecap="round"
				/>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-4xl font-bold text-gray-900">{used}</span>
			</div>
		</div>
	);
}
