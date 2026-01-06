/**
 * Component for the scan button control
 */
export default function ScannerControls({
	isScanning,
	scannedData,
	onToggleScan,
}: {
	isScanning: boolean;
	scannedData: string | null;
	onToggleScan: () => void;
}) {
	return (
		<div className="flex justify-center">
			<button
				onClick={onToggleScan}
				disabled={!!scannedData}
				className={`w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg ring-4 ${
					isScanning
						? "bg-red-600 hover:bg-red-700 ring-red-400/30"
						: scannedData
							? "bg-green-600 ring-green-400/30 cursor-not-allowed"
							: "bg-midnight-blue hover:bg-[#082050] ring-yellow-400/30"
				}`}
			>
				<div
					className={`w-12 h-12 rounded-full ${
						isScanning
							? "bg-red-700"
							: scannedData
								? "bg-green-700"
								: "bg-midnight-blue"
					}`}
				/>
			</button>
		</div>
	);
}
