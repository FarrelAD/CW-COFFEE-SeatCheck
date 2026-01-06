import { Camera } from "lucide-react";
import { RefObject } from "react";

/**
 * Component for the camera/scanner display area
 */
export default function ScannerFrame({
	videoRef,
	isScanning,
	error,
	onRetry,
}: {
	videoRef: RefObject<HTMLVideoElement | null>;
	isScanning: boolean;
	error: string | null;
	onRetry: () => void;
}) {
	return (
		<div className="mb-8">
			{/* Camera/Scanner Frame */}
			<div className="relative aspect-square bg-black rounded-3xl overflow-hidden border-4 border-yellow-400">
				{/* Video Element */}
				<video
					ref={videoRef}
					className="w-full h-full object-cover"
					playsInline
					muted
				/>

				{/* Grid Overlay */}
				{isScanning && (
					<div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0 pointer-events-none">
						{Array.from({ length: 16 }).map((_, i) => (
							<div key={i} className="border border-yellow-400/30" />
						))}
					</div>
				)}

				{/* Placeholder when not scanning */}
				{!isScanning && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-800">
						<Camera className="w-16 h-16 text-gray-400" />
					</div>
				)}

				{/* Error Message */}
				{error && (
					<div className="absolute inset-0 flex items-center justify-center bg-red-600/90">
						<div className="text-center text-white p-4">
							<div className="text-lg font-bold mb-2">⚠️ Error</div>
							<div className="text-sm mb-4">{error}</div>
							<button
								onClick={onRetry}
								className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
							>
								Try Again
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
