"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import SuccessCheckinModal from "./SuccessCheckinModal";
import { useCamera } from "./hooks/useCamera";
import { useQRScanner } from "./hooks/useQRScanner";
import ScannerFrame from "./ScannerFrame";
import ScannerControls from "./ScannerControls";
import ScannerInstructions from "./ScannerInstructions";

export default function QRScannerModal({
	isOpen,
	onClose,
	onScan,
}: {
	isOpen: boolean;
	onClose: () => void;
	onScan?: (data: string) => void;
}) {
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	// Camera management
	const { videoRef, error, startCamera, stopCamera } = useCamera();

	// QR Scanner management
	const {
		isScanning,
		scannedData,
		startScanning,
		stopScanning,
		resetScannedData,
	} = useQRScanner((data) => {
		// Stop camera when scan succeeds
		stopCamera();

		if (onScan) {
			onScan(data);
		}
		setShowSuccessModal(true);
	});

	/**
	 * Handle scan button toggle
	 */
	const handleToggleScan = async () => {
		if (isScanning) {
			stopScanning();
			stopCamera();
		} else {
			await startCamera();
			if (videoRef.current) {
				startScanning(videoRef.current);
			}
		}
	};

	/**
	 * Handle retry after error
	 */
	const handleRetry = async () => {
		await startCamera();
		if (videoRef.current) {
			startScanning(videoRef.current);
		}
	};

	/**
	 * Handle modal close
	 */
	const handleClose = () => {
		stopScanning();
		stopCamera();
		resetScannedData();
		onClose();
	};

	/**
	 * Handle escape key press
	 */
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose();
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	/**
	 * Cleanup on unmount
	 */
	useEffect(() => {
		return () => {
			stopScanning();
			stopCamera();
		};
	}, []);

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
				onClick={handleClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div className="bg-[#E8E9ED] rounded-3xl w-full max-w-sm p-6 relative">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						{/* Close Button */}
						<button
							onClick={handleClose}
							className="w-10 h-10 bg-midnight-blue rounded-full flex items-center justify-center hover:bg-[#082050] transition-colors"
						>
							<X className="w-5 h-5 text-white" />
						</button>

						{/* CW Scan Button */}
						<div className="bg-midnight-blue text-yellow-400 font-bold px-6 py-2.5 rounded-xl">
							CW Scan
						</div>
					</div>

					{/* QR Code Scanner Area */}
					<ScannerFrame
						videoRef={videoRef}
						isScanning={isScanning}
						scannedData={scannedData}
						error={error}
						onRetry={handleRetry}
					/>

					{/* Scan Button */}
					<ScannerControls
						isScanning={isScanning}
						scannedData={scannedData}
						onToggleScan={handleToggleScan}
					/>

					{/* Instructions */}
					<ScannerInstructions
						isScanning={isScanning}
						scannedData={scannedData}
					/>
				</div>
			</div>

			{/* Success Check-in Modal */}
			<SuccessCheckinModal
				isOpen={showSuccessModal}
				onClose={() => {
					setShowSuccessModal(false);
					resetScannedData();
					onClose();
				}}
			/>
		</>
	);
}
