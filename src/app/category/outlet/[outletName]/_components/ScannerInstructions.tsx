/**
 * Component for instruction text
 */
export default function ScannerInstructions({
	isScanning,
	scannedData,
}: {
	isScanning: boolean;
	scannedData: string | null;
}) {
	return (
		<div className="text-center mt-4 text-sm text-gray-600">
			{!isScanning && !scannedData && "Click the button to start scanning"}
			{isScanning && "Point camera at QR code"}
			{scannedData && "QR code scanned successfully!"}
		</div>
	);
}
