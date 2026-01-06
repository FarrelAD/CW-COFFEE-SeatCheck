"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCamera } from "./hooks/useCamera";
import { useQRScanner } from "./hooks/useQRScanner";
import { useCheckIn } from "@/lib/hooks/use-checkin";
import { parseSeatQRData } from "@/lib/utils/qr-utils";
import ScannerFrame from "./ScannerFrame";
import ScannerControls from "./ScannerControls";
import ScannerInstructions from "./ScannerInstructions";
import type { CheckInRecord } from "@/lib/types";

export default function QRScannerModal({
	isOpen,
	onClose,
	onSuccess,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: (record: CheckInRecord) => void;
}) {
	const [scanError, setScanError] = useState<string | null>(null);

	// Camera management
	const { videoRef, error: cameraError, startCamera, stopCamera } = useCamera();

	// Check-in management
	const {
		checkIn,
		loading: checkInLoading,
		error: checkInError,
	} = useCheckIn();

	// QR Scanner management
	const {
		isScanning,
		scannedData,
		startScanning,
		stopScanning,
		resetScannedData,
	} = useQRScanner(async (data) => {
		// Stop scanning and camera
		stopScanning();
		stopCamera();
		setScanError(null);

		try {
			// Parse QR data
			const qrData = parseSeatQRData(data);
			console.log("QR Data:", qrData);

			if (!qrData) {
				setScanError("Invalid QR code. Please scan a valid seat QR code.");
				// Restart camera for retry
				setTimeout(async () => {
					await startCamera();
					if (videoRef.current) {
						startScanning(videoRef.current);
					}
				}, 2000);
				return;
			}

			console.log("Performing check-in...");

			// Perform check-in
			const record = await checkIn(qrData);

			// Call success callback
			if (onSuccess) {
				console.log("Check-in successful. Record:", record);
				onSuccess(record);
			} else {
				console.log("No success callback provided.");
			}
		} catch (err) {
			console.error("Check-in error:", err);
			const errorMessage =
				err instanceof Error ? err.message : "Failed to check in";
			setScanError(errorMessage);

			// Restart camera for retry after error
			setTimeout(async () => {
				await startCamera();
				if (videoRef.current) {
					startScanning(videoRef.current);
				}
			}, 2000);
		}
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
						error={cameraError || scanError || checkInError}
						onRetry={handleRetry}
					/>

					{/* Scan Button */}
					<ScannerControls
						isScanning={isScanning || checkInLoading}
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
		</>
	);
}
