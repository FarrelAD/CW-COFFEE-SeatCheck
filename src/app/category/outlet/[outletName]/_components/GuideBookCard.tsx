export default function GuideBookCard() {
	return (
		<div className="bg-midnight-blue rounded-3xl p-6 mb-6 relative overflow-hidden">
			<div className="relative z-10">
				<h2 className="text-white text-3xl font-bold mb-2">Guide Book</h2>
				<p className="text-white/90 text-sm mb-4 max-w-[200px]">
					Silakan baca terlebih dahulu untuk pemakaian Sistem ini
				</p>
				<button className="bg-white text-midnight-blue font-bold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
					Readme
				</button>
			</div>

			{/* Illustration */}
			<div className="absolute right-0 top-1/2 -translate-y-1/2 w-52 h-52">
				<div className="relative w-full h-full">
					{/* Book Illustration */}
					<div className="absolute right-4 top-1/2 -translate-y-1/2 w-40 h-32 bg-white/20 backdrop-blur-sm rounded-lg transform rotate-12">
						<div className="p-4 grid grid-cols-2 gap-2">
							<div className="bg-white/30 rounded h-4"></div>
							<div className="bg-white/30 rounded h-4"></div>
							<div className="bg-white/30 rounded h-6"></div>
							<div className="bg-white/30 rounded h-6"></div>
						</div>
					</div>
					{/* Person Silhouette */}
					<div className="absolute right-12 bottom-2 w-16 h-20 bg-[#082050] rounded-t-full"></div>
					{/* Question Mark */}
					<div className="absolute right-2 bottom-4 text-white/40 text-4xl font-bold">
						?
					</div>
					{/* Plane Icon */}
					<div className="absolute left-4 top-4">
						<svg
							className="w-8 h-8 text-white/40 transform -rotate-45"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}
